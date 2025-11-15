# Google Sheet Categorizer

this AI workflow imports data from cells in your google sheets spreadsheets and categorizes the according to the categories you give it and updates your spreadsheet with the index of the group each item belongs to, in the cells you indicate.
*note: if an item can't be assigned to any of the given categories it will get -1 for its category index.

---

## 🖥️ Usage
1. Open the google sheets spreadsheet you want to categorize its data and give `hamed-366@sheet-categorizer-477911.iam.gserviceaccount.com` editting access with the share button located in the top left corner
2. open [this link](https://udify.app/workflow/iRj28loFZZ9MQ2fw)
3. Fill in the required fields:
   - Sheet ID (found in the link of your spreadsheet as shown in the photo bellow)
     <img width="2880" height="1824" alt="Screenshot 2025-11-14 150831" src="https://github.com/user-attachments/assets/84a88f56-0908-404d-a14d-99fbd9205eee" />
     Sheet ID of this example is underlined with green color. (1L8Plah6w93*******************gQoqZE) (middle part hidden for security)
   - Label (e.g., `Sheet1`)
   - Input range (e.g., `A1` → `A5`)
   - Output range (e.g., `B1` → `B5`)
   - Categories (e.g., `0-objects 1-fruits ...`)
4. Click **Run Workflow**.
5. AI will read the data in the input cells and will categorize them based on the categories you gave it, and write the index(starting from 0) of the category coresponding to each input cell in the output cells.
6. The response from Dify will appear below the form.
