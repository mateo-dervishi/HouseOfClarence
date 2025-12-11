import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { createClient } from '@/lib/supabase/server';

interface SelectionItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  colour?: string;
  category: string;
  quantity: number;
  labelId?: string;
  notes?: string;
}

interface SelectionLabel {
  id: string;
  name: string;
  color: string;
}

interface SubmitRequest {
  items: SelectionItem[];
  labels: SelectionLabel[];
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const { items, labels }: SubmitRequest = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in selection' }, { status: 400 });
    }

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'House of Clarence';
    workbook.created = new Date();

    // Define column headers
    const columns = [
      { header: 'SKU / Product Code', key: 'sku', width: 20 },
      { header: 'Product Name', key: 'name', width: 35 },
      { header: 'Colour / Finish', key: 'colour', width: 20 },
      { header: 'Category', key: 'category', width: 18 },
      { header: 'Quantity', key: 'quantity', width: 12 },
      { header: 'Unit Price', key: 'price', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'Notes', key: 'notes', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    // Helper to add items to a worksheet
    const addItemsToSheet = (worksheet: ExcelJS.Worksheet, sheetItems: SelectionItem[]) => {
      worksheet.columns = columns;

      // Style header row
      worksheet.getRow(1).font = { bold: true, size: 11 };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1A1A1A' },
      };
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getRow(1).height = 25;

      // Add items
      sheetItems.forEach((item, index) => {
        const row = worksheet.addRow({
          sku: item.slug.toUpperCase(),
          name: item.name,
          colour: item.colour || 'N/A',
          category: item.category,
          quantity: item.quantity,
          price: `£${item.price.toFixed(2)}`,
          total: `£${(item.price * item.quantity).toFixed(2)}`,
          notes: item.notes || '',
          status: 'Pending',
        });

        // Alternate row colors
        if (index % 2 === 0) {
          row.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF5F5F5' },
          };
        }

        row.alignment = { vertical: 'middle' };
        row.height = 22;
      });

      // Add totals row
      const totalQuantity = sheetItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = sheetItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      worksheet.addRow({});
      const totalsRow = worksheet.addRow({
        sku: '',
        name: 'TOTAL',
        colour: '',
        category: '',
        quantity: totalQuantity,
        price: '',
        total: `£${totalPrice.toFixed(2)}`,
        notes: '',
        status: '',
      });
      totalsRow.font = { bold: true };
      totalsRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8E8E8' },
      };

      // Add borders
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
            left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
            bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
            right: { style: 'thin', color: { argb: 'FFD0D0D0' } },
          };
        });
      });
    };

    // Group items by label
    const itemsByLabel = new Map<string, SelectionItem[]>();
    
    items.forEach(item => {
      const labelId = item.labelId || 'unassigned';
      if (!itemsByLabel.has(labelId)) {
        itemsByLabel.set(labelId, []);
      }
      itemsByLabel.get(labelId)!.push(item);
    });

    // Add Summary sheet FIRST (so it appears at the beginning)
    const summarySheet = workbook.addWorksheet('Summary');

    // Create a sheet for each label/room
    labels.forEach(label => {
      const labelItems = itemsByLabel.get(label.id);
      if (labelItems && labelItems.length > 0) {
        const worksheet = workbook.addWorksheet(label.name);
        addItemsToSheet(worksheet, labelItems);
        itemsByLabel.delete(label.id);
      }
    });

    // Create "Unassigned" sheet for items without a label
    const unassignedItems = itemsByLabel.get('unassigned');
    if (unassignedItems && unassignedItems.length > 0) {
      const worksheet = workbook.addWorksheet('Unassigned');
      addItemsToSheet(worksheet, unassignedItems);
    }

    // Now populate the Summary sheet

    summarySheet.columns = [
      { header: 'Field', key: 'field', width: 25 },
      { header: 'Value', key: 'value', width: 40 },
    ];

    // Style header
    summarySheet.getRow(1).font = { bold: true };
    summarySheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1A1A1A' },
    };
    summarySheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Add summary info
    const summaryData = [
      { field: 'Client Name', value: `${profile.first_name} ${profile.last_name}` },
      { field: 'Account Number', value: profile.account_number },
      { field: 'Email', value: profile.email },
      { field: 'Phone', value: profile.phone || 'Not provided' },
      { field: 'Account Type', value: profile.account_type },
      { field: '', value: '' },
      { field: 'Submission Date', value: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })},
      { field: 'Total Items', value: items.reduce((sum, item) => sum + item.quantity, 0).toString() },
      { field: 'Total Categories/Rooms', value: labels.length.toString() },
      { field: 'Grand Total', value: `£${items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}` },
    ];

    summaryData.forEach(data => {
      summarySheet.addRow(data);
    });

    // Generate Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create filename
    const sanitizedName = `${profile.first_name}_${profile.last_name}`.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${profile.account_number}_${sanitizedName}_Selection.xlsx`;

    // Upload to SharePoint via Power Automate
    const powerAutomateUrl = process.env.POWER_AUTOMATE_SHAREPOINT_URL;
    
    if (powerAutomateUrl) {
      try {
        // Convert buffer to base64
        const base64Content = Buffer.from(buffer as ArrayBuffer).toString('base64');
        
        const uploadResponse = await fetch(powerAutomateUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename,
            fileContent: base64Content,
          }),
        });

        if (!uploadResponse.ok) {
          console.error('Power Automate upload failed:', await uploadResponse.text());
        } else {
          console.log('File uploaded to SharePoint successfully');
        }
      } catch (uploadError) {
        console.error('SharePoint upload error:', uploadError);
        // Continue even if upload fails - still return the file to user
      }
    }

    // Return the file as a download to the user
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('Selection submission error:', error);
    return NextResponse.json({ error: 'Failed to generate selection' }, { status: 500 });
  }
}

