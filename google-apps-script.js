/**
 * ============================================================
 * ADVANCE ACADEMY CAREER QUIZ — Google Apps Script Webhook
 * ============================================================
 *
 * HOW TO SET UP:
 * 1. Open your Google Sheet at sheets.google.com
 * 2. Click Extensions → Apps Script
 * 3. Delete any existing code in the editor
 * 4. Paste ALL of this code into the editor
 * 5. Click Save (💾) and name the project "Career Quiz Webhook"
 * 6. Click Deploy → New deployment
 * 7. Choose type: "Web app"
 * 8. Set "Execute as": Me (your Google account)
 * 9. Set "Who has access": Anyone
 * 10. Click Deploy and authorise when prompted
 * 11. COPY the Web App URL that appears
 * 12. In your Vercel project, add an environment variable:
 *     GOOGLE_SHEETS_WEBHOOK_URL = <paste the URL here>
 * 13. Redeploy your Vercel app
 *
 * Your Google Sheet MUST have a tab/sheet named "Responses"
 * (or the script will create one automatically on first run).
 * ============================================================
 */

// Column headers (written on first run)
var HEADERS = [
  'Timestamp',
  'Full Name',
  'Email Address',
  'WhatsApp Number',
  'Career House',
  'House Full Name',
  'Score: Strategist Guild (SG)',
  'Score: Analytical Order (AO)',
  'Score: Connector Circle (CC)',
  'Score: Execution Alliance (EA)',
  'Score: Pioneer League (PL)',
  'Raw Score Breakdown',
];

var HOUSE_NAMES = {
  SG: 'The Strategist Guild',
  AO: 'The Analytical Order',
  CC: 'The Connector Circle',
  EA: 'The Execution Alliance',
  PL: 'The Pioneer League',
};

/**
 * Handles POST requests from the Next.js API route.
 * Writes a new row to the "Responses" sheet.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Get or create the "Responses" sheet
    var sheet = ss.getSheetByName('Responses');
    if (!sheet) {
      sheet = ss.insertSheet('Responses');
    }

    // Write headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);

      // Style the header row
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#050912');
      headerRange.setFontColor('#c9a84c');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);

      // Freeze header row
      sheet.setFrozenRows(1);

      // Auto-resize columns
      sheet.autoResizeColumns(1, HEADERS.length);
    }

    // Parse score breakdown string (format: "SG:4, AO:3, CC:5, EA:3, PL:5")
    var rawBreakdown = data.scoreBreakdown || '';
    var scores = { SG: 0, AO: 0, CC: 0, EA: 0, PL: 0 };

    if (rawBreakdown) {
      var parts = rawBreakdown.split(',');
      parts.forEach(function (part) {
        var kv = part.trim().split(':');
        if (kv.length === 2) {
          var key = kv[0].trim();
          var val = parseInt(kv[1].trim(), 10);
          if (key in scores && !isNaN(val)) {
            scores[key] = val;
          }
        }
      });
    }

    var houseId = data.house || '';
    var houseName = HOUSE_NAMES[houseId] || houseId;

    // Build the row
    var row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.whatsapp || '',
      houseId,
      houseName,
      scores.SG,
      scores.AO,
      scores.CC,
      scores.EA,
      scores.PL,
      rawBreakdown,
    ];

    sheet.appendRow(row);

    // Auto-resize columns after first few rows
    if (sheet.getLastRow() <= 5) {
      sheet.autoResizeColumns(1, HEADERS.length);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error but return success to avoid blocking the quiz
    console.error('Webhook error:', error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (useful for testing the deployment).
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Advance Academy Career Quiz webhook is live.',
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
