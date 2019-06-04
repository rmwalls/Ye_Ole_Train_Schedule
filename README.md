# Ye_Ole_Train_Schedule
Creating a train schedule using Firebase

https://rmwalls.github.io/Ye_Ole_Train_Schedule/

Bootstrap, Jquery, Javascript and HTML (with a little CSS) render the page and handle the logic. Firebase holds the data. 

Right now (6/4/2019), you can enter a new train schedule and it will be stored in Firebase and displayed on the page. A delete button allows you to remove the row from the table and remove it from Firebase. Font Awesome was used for the train icon and the X icon. Moment.js was used to calculate next arrival time and minutes away.

The times will not update upon subsequent reload or reentry of the page. You can't edit any of the rows, delete only. 

The instructions were:
When adding trains, administrators should be able to submit the following:
Train Name
Destination 
First Train Time -- in military time
Frequency -- in minutes
Code this app to calculate when the next train will arrive; this should be relative to the current time.
Users from many different machines must be able to view same train times.
Styling and theme are completely up to you. Get Creative!
