#!/usr/bin/env python3
"""
Generate email signature PNGs for House of Clarence team members.
High-quality 3x resolution for crisp output.
"""

import os
from playwright.sync_api import sync_playwright

# Team members data
team_members = [
    {"name": "Aaron Money", "role": "Managing Director", "personal": "07939 983 477", "business": "0203 715 5892", "email": "aaron"},
    {"name": "Archana Prakasan", "role": "Interior Designer", "personal": "07778 253 100", "business": "0203 715 5892", "email": "archana"},
    {"name": "Akila Ramachandran", "role": "Quantity Surveyor", "personal": "07884 590 058", "business": "0203 715 5892", "email": "akila"},
    {"name": "Chandni Kavaiya", "role": "Kitchen Designer", "personal": "07466 383 810", "business": "0203 715 5892", "email": "chandni"},
    {"name": "Gayathri Charu", "role": "Interior Designer", "personal": None, "business": "0203 715 5892", "email": "gayathri"},
    {"name": "Kailash Kachhwaha", "role": "Business Development Manager", "personal": "07576 066 633", "business": "0203 715 5892", "email": "kailash"},
    {"name": "Sarvesh Malavia", "role": "Interior Designer", "personal": "07586 595 266", "business": "0203 715 5892", "email": "sarvesh"},
    {"name": "Shubham Sharma", "role": "General Manager", "personal": None, "business": "0203 715 5892", "email": "shubham"},
    {"name": "Thomas George Palatty", "role": "Associate Director", "personal": "07415 870 347", "business": "0203 715 5892", "email": "thomas"},
    {"name": "Surya Ravichandran", "role": "Quantity Surveyor", "personal": "07405 463 465", "business": "0203 715 5892", "email": "surya"},
    {"name": "Mehwish Qayoon", "role": "Operations Manager", "personal": "07424 224 107", "business": "0203 715 5892", "email": "mehwish"},
]

def generate_signature_html(member):
    """Generate HTML for a single signature."""
    phone_html = ""
    if member["personal"]:
        phone_html = f'''
        <div class="contact-row">
          <svg viewBox="0 0 14 14"><path d="M8.5 2.5c2.5 0 3.5 1 3.5 3.5m-2-2.5c1 0 1.5.5 1.5 1.5M3.5 6c.8 1.8 2.7 3.7 4.5 4.5l1.5-1.5c.3-.3.8-.4 1.2-.2l2 .9c.5.2.8.7.8 1.2v1.6c0 .5-.5 1-1 1C5.5 13 1 8.5 1 3c0-.5.5-1 1-1h1.6c.5 0 1 .3 1.2.8l.9 2c.2.4.1.9-.2 1.2L4 7.5"/></svg>
          <span class="phone-label">Personal:</span> {member["personal"]} <span class="phone-sep">|</span> <span class="phone-label">Business:</span> {member["business"]}
        </div>'''
    else:
        phone_html = f'''
        <div class="contact-row">
          <svg viewBox="0 0 14 14"><path d="M8.5 2.5c2.5 0 3.5 1 3.5 3.5m-2-2.5c1 0 1.5.5 1.5 1.5M3.5 6c.8 1.8 2.7 3.7 4.5 4.5l1.5-1.5c.3-.3.8-.4 1.2-.2l2 .9c.5.2.8.7.8 1.2v1.6c0 .5-.5 1-1 1C5.5 13 1 8.5 1 3c0-.5.5-1 1-1h1.6c.5 0 1 .3 1.2.8l.9 2c.2.4.1.9-.2 1.2L4 7.5"/></svg>
          {member["business"]}
        </div>'''
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{ 
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif; 
      background: transparent;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }}
    .sig {{
      width: 650px;
      background: #fff;
    }}
    .top-stripe {{
      height: 5px;
      background: #0a0a0a;
    }}
    .main {{
      padding: 20px 25px;
      background: #f8f7f5;
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 2px solid #0a0a0a;
    }}
    /* Left side: HOC | Person */
    .left-brand {{
      display: flex;
      align-items: center;
      gap: 15px;
    }}
    .hoc {{
      font-weight: 200;
      font-size: 28px;
      letter-spacing: 0.06em;
      color: #0a0a0a;
    }}
    .divider {{
      width: 2px;
      height: 35px;
      background: #2d2d2d;
    }}
    .person {{
      text-align: left;
    }}
    .person-name {{
      font-size: 14px;
      font-weight: 500;
      color: #0a0a0a;
      margin-bottom: 2px;
    }}
    .person-role {{
      font-size: 10px;
      color: #888;
      font-weight: 400;
    }}
    /* Right side: House of Clarence */
    .brand-text {{
      text-align: right;
    }}
    .company {{
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0a0a0a;
      font-weight: 400;
    }}
    .tagline {{
      font-size: 9px;
      color: #888;
      margin-top: 3px;
      font-weight: 300;
    }}
    .body {{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }}
    .contacts {{
      display: flex;
      flex-direction: column;
      gap: 6px;
    }}
    .contact-row {{
      display: flex;
      align-items: center;
      font-size: 11px;
      color: #333;
    }}
    .contact-row svg {{
      width: 14px;
      height: 14px;
      margin-right: 10px;
      fill: none;
      stroke: #888;
      stroke-width: 1.5;
      flex-shrink: 0;
    }}
    .phone-label {{
      color: #888;
      font-size: 9px;
      margin-right: 3px;
    }}
    .phone-sep {{
      color: #ccc;
      margin: 0 8px;
    }}
    .socials {{
      display: flex;
      gap: 6px;
    }}
    .social-icon {{
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #0a0a0a;
      color: #fff;
      border-radius: 50%;
      font-size: 11px;
      text-decoration: none;
      font-weight: 400;
    }}
    .bottom-stripe {{
      height: 4px;
      background: #8a8a8a;
    }}
    .notice {{
      font-size: 9px;
      color: #999;
      line-height: 1.6;
      padding: 12px 25px;
      background: #fafafa;
      border-top: 1px solid #eee;
    }}
    .notice strong {{
      color: #666;
    }}
  </style>
</head>
<body>
<div class="sig">
  <div class="top-stripe"></div>
  <div class="main">
    <div class="header">
      <!-- Left: HOC | Person Name & Title -->
      <div class="left-brand">
        <div class="hoc">HOC</div>
        <div class="divider"></div>
        <div class="person">
          <div class="person-name">{member["name"]}</div>
          <div class="person-role">{member["role"]}</div>
        </div>
      </div>
      <!-- Right: House of Clarence text -->
      <div class="brand-text">
        <div class="company">House of Clarence</div>
        <div class="tagline">Refined Finishing for Discerning Spaces</div>
      </div>
    </div>
    <div class="body">
      <div class="contacts">
        <div class="contact-row">
          <svg viewBox="0 0 14 14"><path d="M2 4l5 3.5L12 4"/><rect x="1.5" y="3" width="11" height="8" rx="1"/></svg>
          {member["email"]}@houseofclarence.uk
        </div>
        {phone_html}
        <div class="contact-row">
          <svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5"/><path d="M7 4v3l2 1"/></svg>
          houseofclarence.uk
        </div>
        <div class="contact-row">
          <svg viewBox="0 0 14 14"><path d="M7 1.5c-2.5 0-4 2-4 4 0 3 4 7 4 7s4-4 4-7c0-2-1.5-4-4-4z"/><circle cx="7" cy="5.5" r="1.5"/></svg>
          25-27 Clarence Street, Staines-upon-Thames, Surrey, TW18 4SY
        </div>
      </div>
      <div class="socials">
        <a class="social-icon">in</a>
        <a class="social-icon">f</a>
        <a class="social-icon">X</a>
        <a class="social-icon">◎</a>
      </div>
    </div>
  </div>
  <div class="bottom-stripe"></div>
  <div class="notice">
    <strong>PRIVILEGED AND CONFIDENTIAL:</strong> This email and any attachments are confidential and intended solely for the addressee. If you are not the intended recipient, please notify us immediately and delete this message. Unauthorized disclosure, copying or distribution is strictly prohibited. House of Clarence Ltd.
  </div>
</div>
</body>
</html>'''

def main():
    # Create output directory
    output_dir = "/Users/mateodervishi/Desktop/Email Signatures"
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Generating {len(team_members)} email signatures at 3x resolution...")
    print(f"Output directory: {output_dir}")
    print()
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Use 3x device scale factor for high-DPI/retina quality
        context = browser.new_context(
            viewport={"width": 700, "height": 500},
            device_scale_factor=3
        )
        
        for member in team_members:
            # Generate HTML
            html_content = generate_signature_html(member)
            
            # Create page and set content
            page = context.new_page()
            page.set_content(html_content, wait_until="domcontentloaded")
            
            # Brief wait for rendering
            page.wait_for_timeout(100)
            
            # Get the signature element and screenshot it
            sig_element = page.query_selector(".sig")
            
            # Create filename from name
            filename = member["name"].replace(" ", "_") + ".png"
            filepath = os.path.join(output_dir, filename)
            
            # Screenshot at 3x scale
            sig_element.screenshot(path=filepath, type="png", timeout=5000)
            
            print(f"✓ Created: {filename}")
            
            page.close()
        
        browser.close()
    
    print()
    print(f"All {len(team_members)} signatures saved to: {output_dir}")
    print("Resolution: 3x (high-quality retina)")

if __name__ == "__main__":
    main()
