CREATE TABLE UserRegistration (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    UserPassword CHAR(32) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Calendars (
    CalendarID INT AUTO_INCREMENT PRIMARY KEY,
    CalendarName VARCHAR(50) NOT NULL,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES UserRegistration(UserID)
);

CREATE TABLE UserSharing (
    ShareID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT, -- The user who owns the calendar
    CalendarID INT,
    SharedWithID INT, -- The user with whom the calendar is shared
    PermissionLevel ENUM('View', 'Edit') NOT NULL, -- Add permission level
    FOREIGN KEY (CalendarID) REFERENCES Calendars(CalendarID),
    FOREIGN KEY (UserID) REFERENCES UserRegistration(UserID),
    FOREIGN KEY (SharedWithID) REFERENCES UserRegistration(UserID)
);

CREATE TABLE Task (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(40) NOT NULL, 
    DateDue DATE, 
    TimeDue TIME, 
    CalendarID INT, 
	CreatedByUserID INT,
	FOREIGN KEY (CalendarID) REFERENCES Calendars(CalendarID), 
    FOREIGN KEY (CreatedByUserID) REFERENCES UserRegistration(UserID) -- Reference to the UserRegistration table
);

