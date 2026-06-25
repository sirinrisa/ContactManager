# Contact Manager

Contact management web application on ASP.NET Core with MySQL.

## To Do

- Contact CRUD
- Search and Filter

## Design
https://www.figma.com/design/sI16HdrGsZbr2Mt00Zqxqv/Contact-manager?m=auto&t=UEA1VAVzpo01QbkZ-6

## Examples of work

**Main page**

<img width="2879" height="1280" alt="image" src="https://github.com/user-attachments/assets/8ae66ba8-efa4-42f5-8704-4b6271707627" />

**Create contact pop-up**

<img width="2879" height="1273" alt="image" src="https://github.com/user-attachments/assets/bb60a6b1-8806-47cf-9ffe-ebcbed1f9167" />

**Contact editing pop-up**

<img width="2879" height="1272" alt="image" src="https://github.com/user-attachments/assets/4fc03e38-627c-4238-9e96-ef5665612c89" />


## Installation

git clone https://github.com/yourusername/ContactManager.git
cd ContactManager

## Database

### Import the completed dump

mysql -u root -p < database/contact_manager.sql

### Or create a test user

mysql -u root -p -e "CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'dbuser'; GRANT ALL PRIVILEGES ON contact_manager.* TO 'dbuser'@'localhost';"

### The appsettings.json file already has the following settings configured:

"DefaultConnection": "server=localhost;port=3306;database=contact_manager;user=dbuser;password=dbuser;"

## Launch

dotnet run
