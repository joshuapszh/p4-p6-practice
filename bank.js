/* Original practice bank. No examination questions or answer-key text is stored here. */
(() => {
  "use strict";
  const F = s => s.trim().split("\n").map(line => {
    const [answer, clue, application, alternatives = ""] = line.split("|");
    const special = {
      "animation": "An animation is an effect applied to an object on a slide, such as making a picture appear after the title.",
      "On Click": "The On Click timing option starts an animation when the presenter clicks.",
      "With Previous": "The With Previous timing option starts an animation at the same time as the preceding effect.",
      "After Previous": "The After Previous timing option starts an animation when the preceding effect has finished."
    };
    const model = special[answer] || `The expected answer is “${answer}”. This matches the description “${clue}”.`;
    return { answer, clue, application, alternatives: alternatives.split(";").filter(Boolean), model };
  });
  const U = (name, contexts, facts) => ({ name, contexts, facts: F(facts) });
  const data = {
    P4: [
      U("Files and software", ["a class nature journal", "a library display", "a school garden project"], `
operating system|software that helps a computer start and manage its hardware|A laptop starts and controls its devices. What kind of software does this?|system software;OS
application software|software used to complete a user's task|Which kind of software would help a pupil create a drawing?|app software
folder|a container for related digital files|Several project files need one place to stay together. What should be created?|directory
subfolder|a folder placed inside another folder|A class wants a separate place for each subject inside its main folder. What should it create?|folder inside a folder
rename|change the name of a file without changing its contents|A saved file has an unclear name. What action gives it a clearer name?|change name
move|place a file in a different folder without leaving the original there|A photo is in the wrong folder. What action puts it in the right folder?|cut and paste
copy|make another version of a file while keeping the original|A pupil wants a second copy of a file in another folder. What action helps?|duplicate
Recycle Bin|place where many deleted Windows files can be recovered|A pupil deleted a file by mistake. Where could they look first?|trash
image file|type of file often used for a photograph|What kind of file should store a class photograph?|picture file;photo file
file extension|letters after a filename's final dot that show its type|What part of a filename can help identify whether it is a picture or document?|extension
search|use a filename or word to locate a file|A pupil cannot remember where a saved poster is. Which computer action could help find it?|find
backup|an extra copy kept in case the original is lost|What should a pupil keep to protect important work if a device fails?|spare copy
`),
      U("Working with text", ["a class newsletter", "a reading-club poster", "a science leaflet"], `
centre alignment|place text midway between left and right margins|A heading should sit in the middle of its line. Which alignment helps?|center alignment;align centre;align center
left alignment|line text up with the left margin|A paragraph should begin evenly at the left edge. Which alignment helps?|align left
right alignment|line text up with the right margin|A date should sit against the right edge of a page. Which alignment helps?|align right
justified alignment|spread lines to meet both side margins|A magazine paragraph should have straight left and right edges. Which alignment helps?|justify
bold|make letters thicker for emphasis|Which text style could make a heading stand out with thicker letters?|
italic|slant letters for emphasis|Which text style makes selected letters lean to one side?|
font size|change how large the letters appear|Which setting makes a title's letters larger?|
shading|put colour behind selected text|A word needs a coloured background. Which Word feature helps?|highlight
character spacing|change the distance between letters|Which setting changes the gaps between letters in a word?|letter spacing
indent|move the start of a paragraph inward|Which paragraph setting moves its first line away from the margin?|first-line indent
bullets|show a list with symbols before each item|A set of tips needs a symbol before every line. Which feature helps?|bullet list
page border|draw a line around the edges of a page|A certificate needs an outline around the page. Which feature helps?|border
`),
      U("Digital presentations", ["a local-history talk", "an animal-habitat presentation", "a healthy-food slideshow"], `
slide transition|visual effect when moving from one slide to another|Which feature controls the effect between two slides?|transition
animation|effect applied to an object on a slide|A picture should appear after the title. Which feature controls this?|object animation
On Click|start an animation when the presenter clicks|Which timing option waits for a mouse click before an animation begins?|click
With Previous|start an animation together with the previous effect|Which timing option makes two effects begin at the same time?|
After Previous|start an animation when the previous effect finishes|Which timing option begins an effect after the one before it ends?|
Rehearse Timings|practise a presentation while recording slide durations|A speaker wants slides to advance according to a rehearsal. Which tool saves the practised timings?|rehearse
Presenter View|screen view with speaker notes for the presenter|Which view can show notes to the speaker without showing them to the audience?|
speaker notes|private reminders for a presenter|Where can a speaker keep prompts that are not part of the main slide?|
clear title|short heading that tells the audience a slide's subject|What should be placed at the top to tell viewers what a slide is about?|heading
readable text|letters large and clear enough for the audience|What kind of text makes a slide easy to read from the back of the room?|large text;clear font
eye contact|looking towards the audience while speaking|What can a speaker do instead of staring at the screen throughout?|look at audience
relevant image|picture that supports the slide's main point|What kind of picture should be selected for a slide about an animal?|useful picture;suitable image
`),
      U("Multimedia", ["a class wildlife gallery", "a sports-day media story", "a school arts project"], `
crop|remove unwanted areas at the edges of a picture|A square icon is needed from a wide picture. Which editing action removes the unwanted side areas?|cropping
rotate|turn a picture to a different angle|A diagram arrow must point upwards instead of right. Which editing action changes its direction?|rotation
brightness|make a dark photograph lighter|Which adjustment could help a photo that is too dark?|lighten;exposure
filter|apply a preset visual look to a photograph|Which editing feature can quickly change a photo's overall look?|photo filter
retouch|remove a small unwanted mark in a photograph|Which photo feature could hide a small spot on an image?|spot fix
record|capture sound using a microphone|Which action begins saving a pupil's spoken report as audio?|start recording
stop recording|end the capture of sound|Which action should be used after a pupil finishes speaking into a recorder?|stop
playback|listen to a recording after making it|Which action lets a pupil check how a sound clip came out?|play;listen
trim audio|keep a chosen part of a sound recording|A clip begins with several silent seconds. Which editing action keeps the useful part?|trim
rename recording|give an audio clip a clearer filename|A recording called New Recording needs a useful title. What action helps?|rename
media player|program for playing sound and video files|What kind of program can open a saved song or movie?|video player;audio player
permission|agreement from people before sharing a recording of them|Other pupils can be heard in a clip. What should be obtained before sharing it?|consent;ask first
`),
      U("Digital communication", ["a school book-club message", "a class charity update", "a trip-planning email"], `
recipient|person an email is sent to|Which email field tells the app where to send the message?|to address;to field
subject|short line explaining what an email is about|Which email field gives the message a short title?|
attachment|a file included with an email|A pupil needs to send a worksheet with a message. What should they add?|attach file
message body|main written text of an email|Where should the pupil write the details of the email?|body;message
email address|online address used to receive email|What information is needed to direct a message to a teacher's inbox?|recipient address
proofread|check a message for mistakes before sending|What should a pupil do to spot spelling errors in a message?|check spelling;review
polite language|respectful wording in a digital message|How should a pupil word a message to a classmate?|respectful words;kind words
keep password private|do not give a password to another person|A message asks for a pupil's password. What should the pupil do?|never share password;do not share password
trusted adult|responsible grown-up who can help with a worrying message|Who could help a pupil deal with a suspicious email?|teacher;parent;guardian
report suspicious message|tell a responsible person or use a reporting tool|What should a pupil do with a message that seems unsafe?|tell teacher;report
ask before forwarding|obtain permission before sharing another person's content|A friend sent a photo of someone else. What should be done before forwarding it?|get permission;ask permission
check recipient|make sure the address belongs to the intended person|What should a pupil verify before pressing Send?|check to address
`),
      U("Spreadsheets", ["a classroom reading log", "a charity collection sheet", "a plant-growth table"], `
workbook|an Excel file that can hold several sheets|A pupil saves three spreadsheet tabs together. What is the saved collection called?|
worksheet|one page of cells inside a workbook|What is one tab of cells inside a workbook called?|sheet
row|a horizontal line of spreadsheet cells|What is the line of cells that runs left to right called?|
column|a vertical line of spreadsheet cells|What is the line of cells that runs from top to bottom called?|
cell|one box at the meeting of a row and column|What is one box for entering data called?|
formula|an expression that calculates a result in a cell|What should a pupil enter to calculate a total automatically?|calculation
equals sign|symbol used at the beginning of an Excel formula|Which symbol must appear first in a spreadsheet formula?|=
addition operator|symbol used to add values in a formula|Which operation joins two values to find their sum?|plus sign;+
subtraction operator|symbol used to find the difference between values|Which operation finds how much one value exceeds another?|minus sign;-
Wrap Text|show long cell content on more than one line|Which feature keeps a long label visible inside its cell?|wrap
column width|amount of horizontal space given to a column|Which setting can be increased when text is cut off in a column?|widen column
right alignment|usual horizontal position of a number entered in a cell|When a number is entered normally, which side of a cell does it tend to line up with?|right-aligned
`),
      U("Scratch coding", ["a space-journey project", "an underwater story", "a recycling game"], `
sprite|programmable character or object on the Scratch stage|A pupil adds a programmable spaceship to a Scratch game. What type of object is it?|
stage|area where a Scratch project is shown|Where can a pupil watch the project run?|
backdrop|picture behind sprites on the stage|The Scratch scene changes from a classroom to a forest. What kind of stage image changed?|
Blocks palette|area showing blocks available to use|Where can a pupil find blocks before dragging them into code?|block palette
Code area|workspace where blocks are joined to make scripts|Where should blocks be placed to make a program?|coding area
Event block|block category that can begin a script|Which kind of block can start an action after a trigger?|Events
Motion block|block category used to change a sprite's position|Which block category helps a character travel across the stage?|Motion
Looks block|block category used for appearance and speech bubbles|Which category can change how a sprite looks or what it says?|Looks
Control block|block category used for repeating or choosing actions|Which category contains repeat instructions?|Control
Pen block|block category used to draw a trail on the stage|Which category can make a sprite leave a visible line?|Pen
sequence|order in which instructions are carried out|What do we call the order of steps in a script?|order
loop|instructions that run again and again|What kind of code repeats a set of actions?|repeat
`)
    ],
    P5: [
      U("Storage and data", ["a class astronomy folder", "a community-map project", "a school music collection"], `
cloud storage|online space for files reached through the internet|A group wants to open the same project from home and school. Where could they save it?|online storage
USB flash drive|small removable device for carrying files|A pupil needs a pocket-sized device to carry a presentation. What could they use?|USB drive;flash drive
internal storage|space built into a computer for saved files|Where could a laptop keep a file without a removable device or internet?|hard drive;SSD
binary|number system that uses two digits|Which number system represents data with only two symbols?|
bit|one binary digit|What is one zero or one in binary called?|
byte|a common group of eight bits|What is the data unit made from eight bits called?|
kilobyte|data-size unit larger than a byte and smaller than a megabyte|Which data-size unit comes after bytes and before megabytes?|KB
megabyte|data-size unit larger than a kilobyte and smaller than a gigabyte|Which data-size unit is often used for a small photo?|MB
compression|reduce a file's size for storage or transfer|A folder is too large to send easily. Which process can make it smaller?|compress;zip
upload|send a file from a device to an online service|What is the direction called when a local file goes to online storage?|uploading
download|bring a file from an online service onto a device|What is the direction called when an online file is saved to a laptop?|downloading
process|IPO stage that changes input into useful output|In Input-Process-Output, which stage works on the input data?|processing
`),
      U("Networks and addresses", ["a museum information kiosk", "a sports-centre network", "a science-lab connection"], `
LAN|network covering a small local area such as one building|What network type could link computers in one classroom?|local area network
WAN|network spread across a large geographical area|What network type could link offices in different countries?|wide area network
PAN|network around one person's nearby devices|What network type could connect a phone and wireless earbuds nearby?|personal area network
CAN|network linking several buildings on one campus|What network type could connect computers across a college campus?|campus area network
MAN|network across a town or city|What network type may connect sites across a city?|metropolitan area network
IP address|number used to identify a device on a network|What helps network data reach the intended computer?|internet protocol address
router|device that directs packets between networks|What device can direct traffic from a home network towards the internet?|
data packet|small part of a larger message sent over a network|A long message is divided for travel across a network. What is one of the travelling pieces called?|packet
bandwidth|maximum data capacity of a link per unit of time|What term describes how much data a link can carry each second?|
switch|device that connects devices inside one local network|What device can connect several school computers in the same LAN?|network switch
wireless network|network connection without a cable to each device|What type of connection lets a tablet join a network without an Ethernet cable?|Wi-Fi;wifi
network|two or more connected devices that can exchange data|What is a group of connected computers called?|computer network
`),
      U("Word documents", ["a class recipe booklet", "a wildlife information sheet", "a school-council report"], `
table|grid of rows and columns used to organise information|What Word feature could arrange names and dates in a grid?|
insert row|add a new horizontal line of cells to a table|A table needs space for one more item. What action adds it?|add row
insert column|add a new vertical line of cells to a table|A table needs a new category beside the others. What action adds it?|add column
delete row|remove one horizontal line of cells from a table|What action removes an unnecessary table line across the page?|remove row
merge cells|combine neighbouring cells into a larger cell|A heading must span several cells in one row. What action helps?|merge
split cells|divide one table cell into smaller cells|One table box must become two separate boxes. What action helps?|split
table style|preset appearance for a table|What Word feature can quickly give a table coordinated colours and borders?|style
borders|lines drawn around table cells|What table feature draws visible lines between cells?|table border
Find|locate a word in a document|Which Word command helps locate a repeated word without changing it?|search
Replace|change chosen text to different text in a document|Which command can change a misspelled word throughout a document?|find and replace
header row|top table line naming the columns|What is the first table row that labels each column called?|
cell shading|colour behind a table cell|What appearance change can place a pale colour inside selected table cells?|shading
`),
      U("Online safety", ["a class book-review forum", "a local-history sharing site", "a school-club group chat"], `
cyberbullying|repeated harmful behaviour through digital communication|A group keeps posting cruel rumours about a classmate in an online space. What is this behaviour called?|online bullying
block account|stop an account from contacting or viewing you through a service|What control could prevent an unwanted account from messaging again?|block sender
report abuse|tell a platform about harmful behaviour|Which platform action alerts moderators to an abusive post?|report
save evidence|keep a record of harmful messages to show a trusted adult|What could a pupil keep before an abusive message disappears?|screenshot;keep messages
trusted adult|responsible grown-up who can help with an online problem|Who should a worried pupil speak to about repeated online harm?|teacher;parent;guardian
private profile|account setting limiting who sees profile content|Which account setting could restrict a pupil's posts to approved people?|private account
location sharing|setting that can reveal where a user is|Which setting should be checked before a pupil posts from home?|location
digital footprint|record of traces left by online activity|What term describes the trail created by posts and interactions online?|online footprint
pause before posting|think about effects before putting content online|What should a pupil do before posting an angry reply?|think before posting
ask permission|obtain consent before sharing another person's image|What should a pupil do before uploading a friend's photo?|get consent
strong password|hard-to-guess secret used to protect an account|What kind of password should a pupil choose for an account?|secure password
respectful comment|kind and appropriate reply to another person online|What kind of comment supports safe communication in a class forum?|polite comment
`),
      U("Excel data", ["a library-loan record", "a sports-score sheet", "a seedling-height table"], `
SUM|function that adds values in a range|A charity sheet needs a combined total for donations in cells B2 to B9. Which function should be used?|
MIN|function that returns the smallest number|Which Excel function could find the lowest measurement?|
MAX|function that returns the largest number|A weather log needs to identify its warmest reading. Which function returns that number?|
AVERAGE|function that finds the mean|A gardener wants the typical height of six seedlings. Which function calculates their mean?|
COUNT|function that counts cells containing numbers|Some attendance cells contain numbers and others contain words. Which function counts only the numbered cells?|
Fill Handle|small drag control used to copy a pattern or formula|What tool can quickly extend a formula down a column?|fill
Wrap Text|show a long label on multiple lines within one cell|Which feature keeps a long heading visible without widening its column?|wrap
Merge & Centre|combine selected cells and centre their content|What command can make one title sit across several columns?|merge and center
AutoFit|size a column automatically to fit its contents|Which command can adjust column width to suit the longest entry?|auto fit
column width|horizontal space given to a column|What setting can be increased when text is hidden beyond a cell?|widen column
row height|vertical space given to a row|What setting can be increased when a row needs more vertical space?|taller row
formula|calculation entered into a cell|What should a pupil use when a result must update after source numbers change?|calculation
`),
      U("Audio and video", ["a local-wildlife podcast", "a school-sports highlights clip", "a reading-week video"], `
Audacity|program used to edit sound recordings|Which program can edit a recorded interview's audio?|
Clipchamp|program used to arrange and export a video|Which program can combine clips into a finished school video?|
MP3|common compressed audio file format|Which file type could store a song for playback?|.mp3
MP4|common video file format|Which file type could store a finished video?|.mp4
waveform|visual shape representing recorded sound|What display helps an editor see loud and quiet parts of audio?|
select audio|highlight a section of a sound recording before editing|What should be done before cutting only one noisy section?|select section
cut audio|remove a selected section of sound|Which action removes unwanted sound from a selected interval?|delete section
volume|setting controlling how loud sound plays|What setting could be raised if a recording is too quiet?|amplify
export audio|create a playable file from an audio editing project|What action produces a finished sound file from an editing project?|export
timeline|editing area where clips are arranged in order|Where are clips placed to control the order of a video?|
trim video|shorten the beginning or end of a clip|Which action removes excess footage from a clip's end?|trim
split video|divide one clip into separate pieces|Which action creates two segments from one video clip?|split
`),
      U("Scratch projects", ["a pond-life animation", "a space-rescue story", "a school-garden game"], `
forever|Control block that repeats without a set ending|Which block keeps a sprite's action repeating while its script runs?|
repeat|Control block that repeats a chosen number of times|Which block could make an action happen exactly six times?|
repeat until|Control block that stops looping when a condition is true|Which block could keep moving until a target is reached?|
next costume|Looks block that changes to the following costume|Which block can move a character to its next appearance?|
switch costume to|Looks block that selects a named costume|Which block chooses one particular costume by name?|switch costume
play sound|Sound block that starts an audio clip|Which block could make a sprite produce a recorded noise?|start sound
broadcast|block that sends a named message to other scripts|Which block could tell other sprites that a round has begun?|
when I receive|Event block that starts a script after a message arrives|Which block starts a second sprite's script after a message?|receive
broadcast and wait|message block that waits for receiving scripts to finish|Which block sends a message and waits before moving on?|
touching|Sensing condition that detects contact with an object|Which condition can check if a sprite reaches another sprite?|touching edge
loop|a repeated sequence of instructions|What programming idea avoids stacking the same action many times?|repetition
costume|one possible appearance of a sprite|What is one appearance of a Scratch character called?|
`)
    ],
    P6: [
      U("Computer components", ["a robotics-club purchase", "a school-library computer upgrade", "a classroom media workstation"], `
CPU|component that carries out instructions and processes data|Which component performs the instructions in a computer?|processor
RAM|temporary memory used while programs are running|Which memory holds data needed right now and clears when power is off?|random access memory
ROM|memory holding start-up instructions that remain when power is off|Which memory can keep start-up instructions without power?|read only memory
input device|hardware used to enter data into a computer|What type of device is a keyboard in a computer system?|input
output device|hardware used to present results from a computer|What type of device is a monitor in a computer system?|output
storage device|hardware that keeps files for later use|What kind of device keeps saved work after shutdown?|secondary storage
solid-state drive|fast storage without spinning disks|Which storage choice has no moving disk and can open files quickly?|SSD
hard disk drive|storage device that uses spinning magnetic disks|Which storage choice uses rotating disks inside?|HDD
processing speed|how quickly a processor can perform work|Which hardware factor matters when a computer must run demanding software?|processor speed;CPU speed
capacity|amount of data a storage device can hold|Which factor matters when selecting storage for many large videos?|storage space
peripheral|device attached to a computer to add a function|What is an external printer connected to a computer called?|
compatibility|whether hardware or software works with existing equipment|What should be checked before buying software for an older computer?|works with device
`),
      U("Enhanced documents", ["a class travel guide", "a student research digest", "a community-heritage booklet"], `
hyperlink|clickable text or object leading to another location|What can make text open a relevant webpage when clicked?|link
header|content repeated at the top of pages|Where can a document show its title on every page?|page header
footer|content repeated at the bottom of pages|Where can a document show a class name on every page?|page footer
page number|number showing a page's order in a document|What should be inserted so readers can find page 7 easily?|pagination
table of contents|list of sections and page locations near the start|Which feature helps readers jump to a document's main sections?|contents page
heading style|named formatting used consistently for section titles|What should be applied to section titles to build a useful contents list?|Heading 1;heading
text box|movable area that holds text|What can place a short fact beside the main paragraph?|textbox
caption|short label describing an image or table|What should appear below a diagram to identify it?|figure label
comment|note added for reviewing a document|What can a reviewer add without changing the main text?|review comment
spell check|tool that helps find spelling errors|Which tool can help catch misspelled words before printing?|spelling check
page break|control that starts the following content on a new page|What should be inserted when a new chapter must begin on another page?|new page
alt text|written description of an image for accessibility|What description helps a screen-reader user understand a picture?|alternative text
`),
      U("Spreadsheet analysis", ["a class fundraiser budget", "a sports-house points table", "a reading-challenge record"], `
COUNT|function that counts numeric cells|Which function finds how many entered values are numbers?|
COUNTA|function that counts cells that are not empty|Which function counts filled entries whether text or number?|
SUM|function that adds numbers|A class market records several sales in neighbouring cells. Which function combines their amounts?|
AVERAGE|function that calculates the mean|Which function finds a typical value by dividing the total by the count?|mean
MAX|function that returns the largest value|A lab table records many temperatures. Which function returns the warmest reading?|
MIN|function that returns the smallest value|Which function finds the lowest cost?|
absolute reference|cell reference that stays fixed when copied|What kind of reference keeps pointing to the same cell after a formula is copied?|fixed reference
dollar sign|character used to lock a row or column in a cell reference|Which symbol can be placed in a reference to keep it fixed?|$
relative reference|cell reference that changes when copied|What kind of reference adjusts to the new position of a copied formula?|
chart|visual display of spreadsheet data|What could show a comparison of house points visually?|graph
sort|arrange rows in a chosen order|Which action could put scores from highest to lowest?|sorting
filter|temporarily show only rows meeting a condition|Which action could show only entries for one class?|filtering
`),
      U("Web pages", ["a wildlife-conservation site", "a school-history site", "a student-art exhibition site"], `
homepage|main starting page of a website|What page should welcome visitors and lead them to other sections?|home page
navigation menu|set of links used to move among pages|What helps visitors choose another page of a site?|nav menu
hyperlink|clickable connection to another page or resource|What could connect a sentence to a related page?|link
header|top area of a webpage often holding identity and navigation|Where could a site show its name near the top?|page header
footer|bottom area of a webpage for repeated information|Where could a site place its contact details at the bottom?|page footer
widget|small embedded feature with a specific task|What could add a compact map or calendar feature to a page?|embedded feature
publish|make a finished website available to visitors online|What action makes the completed site accessible through its address?|publishing
preview|check how a webpage looks before publishing|What should a designer use to inspect a page before making it live?|preview page
consistent layout|similar placement of elements across pages|What design choice helps visitors find the menu in the same place each time?|consistency
readable contrast|clear difference between text and background colours|What helps visitors read dark text against a light page?|colour contrast;contrast
alt text|description of an image for people using assistive technology|What should a designer add to explain an informative image?|alternative text
responsive design|layout that adapts to different screen sizes|What design helps a site work on phones as well as computers?|mobile friendly
`),
      U("Digital life and technologies", ["a community-help campaign", "an online school event", "a student digital-citizenship guide"], `
digital footprint|trail of information left by online activity|What may grow when a pupil posts and comments online?|online footprint
privacy setting|control over who can see personal information|What account control can limit the audience for a post?|private setting
strong password|hard-to-guess secret for an account|What should protect an online account from easy guessing?|secure password
malware|software designed to harm or misuse a computer|A device becomes infected after an unsafe download. What broad category describes the harmful software?|malicious software
phishing|deceptive message trying to obtain private information|What is a fake account warning that asks for a password called?|scam message
report tool|platform feature used to alert moderators to harmful content|What can a pupil use to alert a platform to an abusive post?|report button
e-commerce|buying and selling through online services|What technology lets a shop receive purchases through a website?|online shopping
automation|use of technology to perform tasks with little human action|What idea describes a machine carrying out repeated tasks automatically?|automatic process
artificial intelligence|computer systems that carry out tasks associated with human intelligence|What field can help a system recognise patterns in data?|AI
consent|permission before using or sharing another person's material|What should be obtained before posting a friend's photo?|permission
verify source|check that online information comes from a reliable origin|What should a pupil do before trusting a surprising online claim?|check source
two-factor authentication|extra sign-in step beyond a password|What account protection can require a second proof of identity?|2FA;two step verification
`),
      U("Algorithms and flowcharts", ["a library-loan process", "a canteen-order process", "a sports-score process"], `
algorithm|ordered steps for solving a problem|A robot must follow a written plan to sort coloured blocks. What do we call the step-by-step plan?|
input|data received by a program|What is a score entered by a user called in an algorithm?|
output|result displayed or produced by a program|What is a message printed by an algorithm called?|
process box|flowchart shape for an action or calculation|Which flowchart shape should contain total = price + tax?|rectangle;processing box
decision box|flowchart shape for a yes-or-no test|Which flowchart shape should ask whether stock is greater than zero?|diamond
input-output box|flowchart shape for reading or showing data|Which flowchart shape should contain PRINT total?|parallelogram
flow line|arrow showing the direction from one step to another|What connects flowchart boxes and shows where to go next?|arrow
variable|named place for a value that may change|What can hold a running score while an algorithm executes?|
count-controlled loop|repetition that runs a specified number of times|What type of loop is suitable for processing exactly eight entries?|fixed loop
condition-controlled loop|repetition that continues until a test changes|What type of loop can keep asking until a valid answer is entered?|repeat until loop
debug|find and correct an error in an algorithm|What should a pupil do when a flowchart gives an unexpected result?|fix error;trace
procedure|named set of steps that can be used within a larger algorithm|What can package a smaller routine for repeated use?|subroutine
`),
      U("Scratch game design", ["a recycling-sorting game", "a maze-adventure game", "a quiz about habitats"], `
Sensing block|block category that checks conditions such as touching a colour|Which category can detect contact with an object?|Sensing
Control block|block category for loops and if decisions|Which category includes an if-else choice?|Control
Operator block|block category for arithmetic and logical comparisons|Which category can compare two values?|Operators
variable|named value that can change during a project|What could hold a player's current score?|
change variable by|block that adds an amount to a stored value|Which block can increase a score each time an item is collected?|change score by
if else|block that chooses between two paths|Which block could run one action for a correct answer and another for a wrong one?|if-then-else
repeat until|loop that stops once a condition is true|Which loop can keep moving until a sprite reaches a goal?|
key pressed|Sensing condition that checks keyboard input|What condition can test whether the space bar is down?|keyboard pressed
Text to Speech|extension that can speak written words aloud|A Scratch project needs to speak the words typed into a caption. Which extension adds this ability?|text-to-speech
backdrop|stage background that can change between scenes|What could change to show that a game moved to the next room?|
test|run a project to see whether it behaves as intended|What should a game maker do after adding a new rule?|try out;playtest
debug|find and fix a problem in a script|What should a pupil do when a game stops at the wrong time?|fix code
`)
    ]
  };
  const blueprints = {
    P4: {
      mcq: [3,3,3,3,3,2,3],
      short: [[0,2],[0,2],[1,2],[1,2],[2,3],[2,2],[3,2],[3,2],[3,2],[4,3],[4,3],[5,2],[5,3],[6,3],[6,2]],
      scenario: [[[0,1],[1,1],[2,1]],[[3,5]],[[3,5]],[[4,5]],[[4,5]],[[5,4]],[[5,4]],[[5,3]],[[6,4]],[[6,4]],[[6,3]]]
    },
    P5: {
      mcq: [2,2,2,3,4,3,4],
      short: [[0,2],[0,2],[1,2],[1,2],[2,3],[2,2],[3,2],[3,2],[3,2],[4,3],[4,3],[5,2],[5,3],[6,3],[6,2]],
      scenario: [[[0,1],[1,1],[2,1]],[[0,1],[1,1],[2,1]],[[3,5]],[[3,5]],[[4,5]],[[4,4]],[[5,4]],[[5,3]],[[5,3]],[[6,5]],[[6,5]]]
    },
    P6: {
      mcq: [2,1,2,3,4,4,4],
      short: [[0,2],[0,2],[1,3],[2,3],[3,2],[3,3],[4,3],[4,3],[5,3],[5,2],[5,2],[6,3],[6,4]],
      scenario: [[[0,4]],[[1,2]],[[2,4]],[[3,8]],[[4,10]],[[5,8]],[[6,9]]]
    }
  };
  function shuffle(arr, seed) {
    const result = [...arr];
    let x = seed >>> 0;
    for (let i = result.length - 1; i > 0; i--) {
      x = (1664525 * x + 1013904223) >>> 0;
      const j = x % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  const flowCases = {
    1: {title:"Library loan", input:"Library card number", test:"Card valid?", yesAction:"Record loan", yesOutput:"Show due date", noOutput:"Ask pupil to register"},
    2: {title:"Canteen order", input:"Meal code", test:"Meal available?", yesAction:"Add meal to order", yesOutput:"Show order number", noOutput:"Choose another meal"},
    3: {title:"Sports score", input:"Points earned", test:"Points above zero?", yesAction:"Add points to total", yesOutput:"Show new total", noOutput:"Check entered points"}
  };
  function flowParts(flow) {
    const part=(prompt,answer,model,alternatives=[])=>({prompt,answer,model,alternatives,hint:"Follow the arrows from Start and read the labelled shapes."});
    return [
      part("What information is entered in the input shape?",flow.input,`The input is the ${flow.input.toLowerCase()}.`),
      part("What question is tested in the diamond?",flow.test,`The diamond tests whether the answer to “${flow.test}” is yes or no.`),
      part("Which branch is followed when the test is true?","Yes","When the test is true, the flow follows the Yes branch."),
      part("What is shown on the No branch?",flow.noOutput,`The No branch shows “${flow.noOutput}”.`),
      part("What action happens on the Yes branch?",flow.yesAction,`On the Yes branch, the process is to ${flow.yesAction.toLowerCase()}.`),
      part("What information is shown after the Yes action?",flow.yesOutput,`After the Yes action, the flowchart will ${flow.yesOutput.toLowerCase()}.`),
      part("What shape is used for the test?","decision box","The test is placed in a diamond-shaped decision box.",["diamond"]),
      part("Does the No branch carry out the Yes action?","No","No. The No branch shows its own message and does not carry out the Yes action.")
    ];
  }
  function makePaper(level, set) {
    if (!data[level] || ![1,2,3].includes(set)) throw new Error("Unknown paper");
    const units = data[level], plan = blueprints[level], a = [], b = [], c = [];
    const ac = plan.mcq.flatMap((count, unit) => Array.from({length:count}, (_, i) => ({unit,i})));
    shuffle(ac, set * 1151 + Number(level.slice(1))).forEach(({unit,i}, index) => {
      const u = units[unit], fact = u.facts[((set-1)*4+i)%u.facts.length];
      const distractors = u.facts.filter(f => f.answer !== fact.answer).slice((i+set)%4).slice(0,3);
      while (distractors.length < 3) distractors.push(u.facts[(i+distractors.length+1)%u.facts.length]);
      const choices = shuffle([fact.answer,...distractors.map(f=>f.answer)], set*157+index*29+unit);
      const prompt = set===3 ? "For " + u.contexts[set-1] + ": " + fact.application :
        set===2 ? "Choose the term or action defined here: " + fact.clue + "." :
        "Which term or action matches this description: " + fact.clue + "?";
      a.push({id:"A"+(index+1),number:index+1,section:"A",unit,topic:u.name,marks:1,prompt,choices,correct:choices.indexOf(fact.answer),model:fact.answer,explanation:fact.model});
    });
    const bc = Array(7).fill(0);
    shuffle(plan.short, set*677+Number(level.slice(1))).forEach(([unit,marks],index) => {
      const u=units[unit], parts=[];
      for(let n=0;n<marks;n++){
        const fact=u.facts[(set*3+5+bc[unit]++)%u.facts.length];
        parts.push({prompt:"For "+u.contexts[set-1]+", name the term, feature, or action that matches: "+fact.clue+".",answer:fact.answer,model:fact.model,alternatives:fact.alternatives,hint:"Think about "+u.name.toLowerCase()+"."});
      }
      b.push({id:"B"+(index+1),number:21+index,section:"B",unit,topic:u.name,marks,context:"Give one brief answer for each part.",parts});
    });
    const cc=Array(7).fill(0);
    shuffle(plan.scenario,set*991+Number(level.slice(1))).forEach((groups,index)=>{
      const parts=[], topics=[];
      groups.forEach(([unit,count])=>{
        const u=units[unit]; topics.push(u.name);
        for(let n=0;n<count;n++){
          const fact=u.facts[(set*5+2+cc[unit]++)%u.facts.length];
          parts.push({prompt:"In "+u.contexts[set-1]+": "+fact.application,answer:fact.answer,model:fact.model,alternatives:fact.alternatives,hint:"Consider the most suitable "+(unit<3?"term or feature":"action or concept")+" for this situation."});
        }
      });
      const unit=groups.length===1?groups[0][0]:null;
      const visual=level==="P6"&&unit===5?{type:"flowchart",...flowCases[set]}:null;
      if(visual)parts.splice(0,parts.length,...flowParts(visual));
      const context=unit===null ? "A school team is preparing digital work for an open day. Answer each situation." :
        visual ? "Study the original flowchart shown with this question. Use it to answer every part." :
        "A class is working on "+units[unit].contexts[set-1]+". Answer each situation.";
      c.push({id:"C"+(index+1),number:(level==="P6"?34:36)+index,section:"C",unit,topic:topics.join(" · "),marks:parts.length,context,parts,visual});
    });
    const questions=[...a,...b,...c];
    const totals={A:a.reduce((n,q)=>n+q.marks,0),B:b.reduce((n,q)=>n+q.marks,0),C:c.reduce((n,q)=>n+q.marks,0)};
    if(totals.A!==20||totals.B!==35||totals.C!==45)throw new Error("Paper mark total is incorrect");
    return {level,set,units:units.map(u=>u.name),questions,totals};
  }
  window.PRACTICE_BANK={makePaper};
})();
