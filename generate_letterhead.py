#!/usr/bin/env python3
"""
Generate letterhead PNG for House of Clarence.
High-quality 3x resolution for crisp output.
"""

import os
from playwright.sync_api import sync_playwright

def generate_letterhead_html():
    """Generate HTML for the letterhead."""
    return '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif; 
      background: transparent;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .letterhead {
      width: 595px; /* A4 width at 72dpi, will be 3x */
      height: 842px; /* A4 height at 72dpi */
      background: #fff;
      display: flex;
      flex-direction: column;
    }
    .top-bar {
      height: 8px;
      background: #0a0a0a;
    }
    .header {
      background: #f8f7f5;
      padding: 30px 40px 25px;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .hoc {
      font-weight: 200;
      font-size: 42px;
      letter-spacing: 0.08em;
      color: #0a0a0a;
    }
    .divider {
      width: 2px;
      height: 50px;
      background: #2d2d2d;
    }
    .brand-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .company {
      font-size: 14px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #0a0a0a;
      font-weight: 400;
    }
    .tagline {
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #888;
      font-weight: 300;
    }
    .contact-info {
      text-align: right;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .contact-line {
      font-size: 10px;
      color: #555;
      font-weight: 400;
    }
    .header-line {
      height: 3px;
      background: #0a0a0a;
    }
    .content-area {
      flex: 1;
      padding: 40px;
      background: #fff;
    }
    .content-placeholder {
      font-size: 11px;
      color: #ccc;
    }
    .footer {
      background: #f5f4f2;
      padding: 18px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e8e8e8;
    }
    .footer-brand {
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #0a0a0a;
      font-weight: 400;
    }
    .footer-right {
      display: flex;
      gap: 30px;
    }
    .footer-item {
      font-size: 10px;
      color: #888;
    }
    .bottom-bar {
      height: 8px;
      background: #0a0a0a;
    }
  </style>
</head>
<body>
<div class="letterhead">
  <div class="top-bar"></div>
  <div class="header">
    <div class="header-content">
      <div class="brand">
        <div class="hoc">HOC</div>
        <div class="divider"></div>
        <div class="brand-text">
          <div class="company">House of Clarence</div>
          <div class="tagline">Refined Finishing for Discerning Spaces</div>
        </div>
      </div>
      <div class="contact-info">
        <div class="contact-line">020 3370 4057</div>
        <div class="contact-line">enquiries@houseofclarence.com</div>
        <div class="contact-line">houseofclarence.com</div>
      </div>
    </div>
    <div class="header-line"></div>
  </div>
  <div class="content-area">
    <div class="content-placeholder">Content area</div>
  </div>
  <div class="footer">
    <div class="footer-brand">House of Clarence</div>
    <div class="footer-right">
      <div class="footer-item">London</div>
      <div class="footer-item">houseofclarence.com</div>
    </div>
  </div>
  <div class="bottom-bar"></div>
</div>
</body>
</html>'''

def main():
    # Output directory
    output_dir = "/Users/mateodervishi/Desktop/email signature and letterheads"
    os.makedirs(output_dir, exist_ok=True)
    
    print("Generating letterhead at 3x resolution...")
    print(f"Output directory: {output_dir}")
    print()
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Use 3x device scale factor for high-DPI/retina quality
        context = browser.new_context(
            viewport={"width": 650, "height": 900},
            device_scale_factor=3
        )
        
        # Generate HTML
        html_content = generate_letterhead_html()
        
        # Create page and set content
        page = context.new_page()
        page.set_content(html_content, wait_until="domcontentloaded")
        
        # Brief wait for rendering
        page.wait_for_timeout(100)
        
        # Get the letterhead element and screenshot it
        letterhead_element = page.query_selector(".letterhead")
        
        # Filepath
        filepath = os.path.join(output_dir, "HOC_Letterhead.png")
        
        # Screenshot at 3x scale
        letterhead_element.screenshot(path=filepath, type="png", timeout=5000)
        
        print(f"✓ Created: HOC_Letterhead.png")
        
        page.close()
        browser.close()
    
    print()
    print(f"Letterhead saved to: {filepath}")
    print("Resolution: 3x (high-quality retina)")

if __name__ == "__main__":
    main()

