# json2excel

web application that allows you to convert JSON-formatted text into a downloadable Excel file. The process involves taking text containing JSON data and reorganizing it into two columns in an Excel file.

# Usage Instructions
- Data Input: In the input area, paste or type the JSON-formatted text you want to convert.<br>
- Process: Click the "Process" button to initiate the conversion.<br>
- Download: Once processed, the generated Excel file is available for download.<br>

# How It Works
The script performs the following steps:
1. Takes the JSON-formatted input text and removes commas.

2. Splits the text into lines to process each line separately.

3. Ignores blank lines and those containing ".comment" (optional).

4. Removes curly braces "{}" from each line to obtain key-value pairs.

5. Splits each line by ':' and removes whitespace around the separator.

6. Organizes the data into two columns: "Name" and "Value". Key-value pairs are converted into rows in the Excel file.

7. Creates an Excel file with the organized data.

8. Generates a unique file name for download.

9. Allows the user to download the Excel file with the processed data.

Example
Input in JSON format:

json
Copy code
{
  "Name": "John",
  "Age": 30,
  "City": "New York"
}
Output in the Excel file:

Name	John
Age	30
City	New York

# Note
The script can be customized to include or exclude specific data, depending on the user's needs. Additionally, additional features can be added based on specific project requirements.

# future features
- Specify custom formatting
- Aditional function to compare two json file content
