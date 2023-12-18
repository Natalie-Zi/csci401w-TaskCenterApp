# Software Engineering Class Final Reflection

## Table of Contents

- [Product Vision](#product-vision)
- [Learning and Growth Journey](#learning-and-growth-journey)
  - [Reflection](#reflection)
- [Product Showcase](#product-showcase)
  - [Elevator Pitch](#elevator-pitch)
  - [Product Demo](#product-demo)
  - [Technical Architecture Overview](#technical-architecture-overview)
  - [Codebase Exploration](#codebase-exploration)
  - [Access Your Work](#access-your-work)
- [Final Reflection Presentation](#final-reflection-presentation)
- [Career Readiness Assessment](#career-readiness-assessment)

## Product Vision

Our vision behind creating Task Center—a web-based application designed to simplify schedule management for users, whether you’re a student juggling assignments, an office worker balancing meetings, or a restaurant manager handling shifts. Our application would allow users to take back control over their busy scheduling enabling improved task organization and time management, offered by the versatility support for multiple calendars. The introduction of multiple calendars would allow our users to better optimize their scheduling for different aspects of life or work.

### Learning and growth journey

### Reflection

Reflect on your journey in learning software engineering through concrete scenarios:

1. **Team Collaboration Approach:**
   Describe how your team used tools like Slack and Trello to coordinate tasks. Share an example of how assigning tasks in Trello helped streamline your group projects and fostered effective communication.

   - **Brayan:** The use of Trello proved incredibly helpful in keeping track of incomplete features that needed to be worked on. Overall, the use of Trello helped with our efficiency in managing and completing tasks.
     
   - **Nicholas:** I feel like Trello helped the group with organizing and planning what needed to be done. We could clearly see what still needed to be done and what each of us was working on which helped to plan out each step in the process.
     
   - **Natalie:** We used Trello to keep track of which team members were working on which user story/function of our web application. For example, if I completed one task, I could quickly go in and look at the "To Do" column in my team's Trello board to see if there was another task I could start doing that didn't already have someone assigned to it.
     
   - **Veronica:** My team used Trello mainly to know which tasks had to be done, were in progress or were completed. As we decided who would work on what we kept updating the members for the task. To communicate outside our meeting we used a groupchat on Team that allowed us to discuss what we were currently working on, if anyone was having an issue and needed help or telling each other when we were done so someone else could test the code on their end.

2. **Challenges and Overcoming Them:**
   Recall a specific challenge, like debugging a code issue together. Explain how you collaborated to identify the bug's source and successfully resolved it. This experience showcases your problem-solving and teamwork skills.

   - **Brayan:** When working on the share functionality of the program, I encountered an issue with the 'post handler getTaskInformation' not displaying for the user to whom the calendar was shared. To overcome this, I changed the parameters for 'getCalendarIDByName' from (loggedInUserID, calendarName) to just (calendarName). This change made it easier to pass the logic to check whether the logged-in user owns the calendar or if it's shared with them to display the task info.
     
   - **Nicholas:** One of the coding problems we ran into was when I would commit my work on the front end to my branch in the github and when the Brayan tried to make it work with the database the css would get messed up. Usually during our meetings we would put it on screen and compare what everyone has to see why it was working for some and not everyone.
     
   - **Natalie:** Implementation of the login system and account registration went fairly smoothly. Many issues arose once we started working on coding the actual functions of the calendar, though. One challenge the team had to overcome was giving a user the ability to delete a specific task from a calendar after it had been added. We had trouble figuring out how to make the application know which specific task to delete from the database based on a user's input in the frontend. We all worked on the same version of the code in VScode but tried different things, making small changes until someone eventually stumbled across a functional solution. In the end, we decided to have the app delete tasks by their name; the user is prompted for the name of the task they want to delete, and the application deletes it. Deleting an entire calendar and any tasks associated with it was another complicated function that we would've needed more time to implement, so that ended up being set aside as a feature that could be added in the future.
     
   - **Veronica:** One of the biggest challenges for me was understanding how to work on all the different files and make them work together. The first feature I worked on fully and had working in the end was the login feature and looking at Bryan's code for the register feature really helped me understand what I needed to do in order to have everything working. At that time we met once in person and it really helped me since it made it easier to show my code and receive feedback from my teammate.

3. **Accomplishments and Pride:**
   Highlight a feature you contributed to, such as creating a login system. Discuss how your combined skills enabled the team to deliver a functional feature that enhances user experience.

   - **Brayan:** After spending a considerable amount of time trying to fix the punctuality of the getTaskInformation, I was finally able to make it work. Now, when a user shares their calendar, the person with whom the calendar is shared can view the tasks associated with it.
     
   - **Nicholas:** My part was mainly the frontend. I've had a little experience with html, css, and javascript so I took charge of getting the frontend working. While the rest of the team worked on their parts we would come together and when they had a feature they wanted to implement, such as a share button for calendars shared between users and a calendar selection box for just shared calendars, I would tweak the front end to add those features and work with them to get it working with their stuff.
     
   - **Natalie:** Prior to taking this course, I only really had experience doing backend coding in Java, with an IDE such as Eclipse. Many aspects of coding a web application were completely new to me and I had to learn Javascript, Html, and CSS as I went. By looking at some examples of similar web applications online, I started off with just the basic index.js file that imported the framework and established some routes. The structure of the folders and what each section of code in each file does started to make more sense to me as the team made more progress with our project. Some of my teammates had prior experience with Html and CSS and I also looked at the code they contributed as a reference for how to structure my code. One feature I created was a help page where a new user can find answers to some common questions they might have. I tried to think like someone who doesn't know the details of the features that were coded into the application, which helped me come up with those questions. At the start of the software development stage, there was a basic plan for a few team members to specifically handle the backend, but everyone sort of ended up contributing something to the backend since it was complex and required a lot of collaborative trial and error.
     
   - **Veronica:** The delete task feature is what took me probably the longest, I kept working on it full days and I dfidn't understand how to make it work even after watching tutorials and other resources. After couple times I also aked my teammates to review the code I had so far, it finally worked and that felt like a big accomplishment for me.

4. **Learning and Growth:**
   Provide an example of how you applied a concept learned in class to a practical scenario. Describe how you used version control (like Git) to collaborate on a coding assignment, improving code organization and collaboration.

   - **Brayan:** An example I can share from a concept learned in class was about utilizing jQuery. Learning how post requests function and how to adapt it into the frontend and how to handle the post in the backend.
     
   - **Nicholas:** I'm new to working with github but I will say that it helped with our project when we each were working on code and we could make a branch for each of us. It helped when we needed to look at what the other person had worked on and compare code.
     
   - **Natalie:** Creating a separate branch for every team member made it easier to collaborate on GitHub. The source code of our TaskCenter app has a lot of files separated into different folders, and it would've gotten very confusing and convoluted if we only had the main branch. Giving everyone their own branch to work in made it easy for us to keep our work separate and only add our pieces of code to the final version once we'd all agreed on it during our meetings. There were times when my code was missing some important new functions that another team member had figured out, for example, and it was easy for me to see which files had been recently updated in their branch and replace my outdated code with the updated version.

   - **Veronica:**  I liked that each one of us had its own branch on github so that the code didn't get mixed. Periodically when someone had a piece of code working, I would test it out with what was in the main branch and then upload it so that everyone could use it. When we got to code the latest features, we had more issues so it was mostly one tells the other they updated the code so you could go to their branch. That's when we decided to have the draft branch which had the latest working code. As we approached the end and were putting together the final code, I created a final draft branch where I uploaded the code I had after putting all the pieces together and renaming some files, that way if needed someone could download just that branch and have the full code.


## Product Showcase

### Elevator Pitch

Our vision behind creating Task Center—a web-based application designed to simplify schedule management for users, whether you’re a student juggling assignments, an office worker balancing meetings, or a restaurant manager handling shifts. Our application would allow users to take back control over their busy scheduling enabling improved task organization and time management, offered by the versatility support for multiple calendars. The introduction of multiple calendars would allow our users to better optimize their scheduling for different aspects of life or work. 

### Product Demo

Share simple examples of your product's functionality:

- **Register:** Demonstrate how to create an account and how the email detection and password requirements are showed.
- **Login:** Show how to login
- **Calendar lists and Help page:** Show how to navigate between the homepage and the help page
- **Add a calendar and add task:** Demonstrate how to create a new calendar and add a task
- **Delete a task:** Show what are the steps to delete a task in the calendar
- **Share a calendar:** Show how to add a task and set view or edit permission and how those will function for the user that the calendar was sharesd to

### Technical Architecture Overview

Simplify a technical concept with an example:

- **Example:** Explain the client-server architecture by comparing it to a waiter taking orders (client) and a kitchen preparing food (server).

### Codebase Exploration

Illustrate a coding concept with a relatable analogy:

- **Example:** Describe a conditional statement (like an "if" statement) as a recipe that's followed only if certain conditions, like having all ingredients, are met.

### Access Your Work

- **[Presentation Slides](link-to-presentation):** Share a link to your final presentation slides.
- **[Source Code Repository](link-to-repo):** Provide access to your source code repository.
- **Other Materials:** Include links to diagrams or documents you created for your project.

## Final Reflection Presentation

- **Duration:** 25-minute minimum, 40-minute maximum

## Career Readiness Assessment

Answer the following questions with practical examples:

1. **Team Collaboration Skills:** Reflect on a time when coordinating with team members improved a project's outcome or efficiency.
   - **Brayan:**
     
   - **Nicholas:** Using Trello enhanced our project's efficiency. It helped us organize tasks and track progress, leading to better coordination and a more streamlined process.
     
   - **Natalie:** It was good to have several people making an attempt at solving the problem when we encountered obstacles. Having more eyes on the code led to solutions being found quicker when it came to the calendar functions. Each person looked at the code from a different perspective, so when one team member was dealing with a persistent error or bug, another team member occasionally gave insight that helped them locate it.
     
   - **Veronica:**  I would say that coordinating with other tem members helped a lot in this project because whenever we had an issue. Someone else would look at what we had so far for the code and sometimes it was just a missing comma or misspelled word that would have taken way longer to see for who wrote the code.
     
2. **Problem-Solving Abilities:** Share a situation where you had to troubleshoot a technical issue and how you approached the problem-solving process.
   - **Brayan:**
     
   - **Nicholas:** Faced with CSS conflicts when integrating frontend and backend work, we tackled the issue by collaboratively analyzing the code in meetings. This approach helped us identify and solve the compatibility issues effectively.
     
   - **Natalie:** While I was creating the help page, there were moments where the formatting was off and didn't match the look of the home page. I had to look at the CSS style sheets and the html code for the home page, which were written by my teammates, to figure out how to make the navigation bar and headings line up properly.
     
   - **Veronica:**  When working on the delete task feature I ran into various issues where I would fix one thing and another one would not work anymore. I decided to take some time off the code and then I talked with our teammates about it. We decided that it would have been easier to just ask the user for the task name, so I restarted everything and it ended up working better that trying to have a delete button for each task where the task id would be stored.
     
3. **Contributions to the Project:** Discuss a specific task you contributed to and how your involvement positively impacted the project's development.
   - **Brayan:**
     
   - **Nicholas:** My key contribution was in frontend development, where I integrated new features like a shared calendar button. This significantly improved the user interface and the overall functionality of the project.
     
   - **Natalie:** I contributed to the project by writing code for a help page where a new user can find guidance for how the calendar's features work. Along with creating the page itself, I created routes for navigating back and forth from the home page to the help page. In the earlier stages of developing the project, I also came up with the early concept of how the user interface and layout might work before we knew whether we'd be making a mobile, desktop, or web app. Some of those ideas carried over into the final product, such as the task list being next to the calendar.

   - **Veronica:** I contributed by working mostly on the backend development, in the specific I worked on the login page, delete task and then added some smaller features such as the password validation and how to format the time to AM/PM format since it was stored in 24H time. I also tried helping keeping the github and trello organized and up to date.
   - 
4. **Applied Knowledge:** Describe a technical concept learned in class that you've used in your project, highlighting its practical relevance.
   - **Brayan:**
     
   - **Nicholas:** applied the concept of using branches in GitHub, learned in class, for better project management. This allowed for efficient collaboration and easy code review, greatly benefiting our project's development.
     
   - **Natalie:** I learned a lot about utilizing a framework in backend development of a web application. The use of Express in this project was my first time doing anything with a framework. This is a good thing for a programmer to have some experience with since many pieces of software- regardless of whether they're a mobile, desktop, or web app- are made with frameworks rather than being coded completely from scratch.

   - **Veronica:** I found Trello to be a valuable tool once we grasped the correct setup. It provided a clear visual representation of tasks and their assignees, allowing us to easily track progress. The "to do" features list was particularly beneficial, serving as a focused agenda for our meetings and ensuring that discussions centered around crucial tasks that needed attention. This streamlined approach to project management facilitated effective collaboration and decision-making within the team.

     
5. **Adaptability and Learning:** Provide an example of a challenge you faced that required learning a new skill or concept, and how you adapted to overcome it.
   - **Brayan:**
     
   - **Nicholas:** Learning to use GitHub was a challenge I overcame, which was crucial for managing our project effectively. Adapting to this new tool enhanced our workflow and my personal skill set.
     
   - **Natalie:** I had to adapt to writing in several programming languages that I had very limited knowledge of going into this project. I also had to pick up on several major new concepts, such as creating a server and an API between the server and the browser. The code examples that the professor supplied to our team, as well as the code written by my teammates and some other online sources, helped me get a better grasp on some of these things.

   - **Veronica:** One challenge I faced was dealing with lots of files written in different languages. I didn't know anything about JavaScript, and it was my first time working on a project with more than one language. What I did was get copies of the code and spend time trying things until I understood how everything fit together. Surprisingly, learning JavaScript didn't take as much time as I thought.

---

