# candidate-contributions
A graph of presidential campaign contributions made between 2015-2016

Author: Nicole Scherm
Last updated: 6/19/17

Notes on building out the app:

== Handling the data ==

The first step I took was to download the files from the website provided. I used the Contributions to Candidates (and other expenditures) from Committees file to get campaign contributions, and the Candidate Master File and Committee Master File to convert the codes into usable information. 

Since I interpreted the assignment to be focused on the displaying of information, I chose not to focus on creating a database. I used a Python script to change the data into a JSON file, because I was building a web app and JSON files work well with JavaScript (and I have experience using Python and JSON files).

The site suggested setting up a relational database to make sense of the data, but since I needed a relatively small subset of the candidates this seemed unnecessary. Instead, I created a Python dictionary with candidate names and their ID numbers and used that when parsing the entries. To create the dictionary, I went through every entry in the Candidate Master File using Python and determined relevant candidates based on the Year of Election (2016) and Candidate Office ("P"). For all relevant candidates, I created an entry with their name and Candidate ID. I then parsed through the Committee Master File to create a dictionary linking committees and their ID numbers as well.

Once I had the two dictionaries, I created a JSON file for contributions made by committees. I determined if an entry was relevant based on whether the Candidate ID was in the dictionary I created. If so, I added an entry to the JSON file that included the Transaction Amount, recipient candidate, and the committee filing the report.

== Building out the interface ==

The first step in building out the interface was to take the data and condense it into something useful and readable. After loading the JSON file, I found the total money contributed to each candidate. I chose to save this information in an array of objects because it would make it easy to add more properties to each candidate (such as party affiliation, number of campaign contributors, etc) if the app were expanded on in the future.

Once I had all candidates and their corresponding contribution total, I used this information to build out a bar graph. I used the d3.js library to help draw the graph. Knowing that I wanted the graph to fit on a laptop screen, I scaled the data rather than displaying the bars and y-axis at their full height. Because of the number of candidates along the x-axis, I decided it was not feasible to make the graph mobile-responsive.

I added a header to describe the graph, but otherwise I intentionally kept the page simple. Although it was not requested, I decided to list the candidates and their contribution totals below the graph. (Many of the candidates with smaller contribution totals displayed similarly on the graph due to the scale.) I also added a loader graphic so it would be visually apparent that the page was still loading while the script was running.

== Further ==

If this was a project that was meant to be reusable or extended (to more presidential races, for example), I would have looked into setting up the data in databases and creating relational databases instead of manually creating Python dictionaries to link candidate IDs and names. 

With more time, I would've also liked to look into other aspects of the data, such as candidate party affiliation, number of campaign contributors, and size of contributions made by contributors. I'd want to make the page more responsive - for instance, having the option to show details on one candidate and drawing new graphs with their contributors.
