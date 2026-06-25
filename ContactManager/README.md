# Contact Manager

Contact management web application on ASP.NET Core with MySQL.

## Design
https://www.figma.com/design/sI16HdrGsZbr2Mt00Zqxqv/Contact-manager?m=auto&t=UEA1VAVzpo01QbkZ-6

## Installation

git clone https://github.com/yourusername/contact-manager.git
cd contact-manager

## Database

### Import the completed dump

mysql -u root -p < database/contact_manager.sql

### Or create a test user

mysql -u root -p -e "CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'dbuser'; GRANT ALL PRIVILEGES ON contact_manager.* TO 'dbuser'@'localhost';"

### The appsettings.json file already has the following settings configured:

"DefaultConnection": "server=localhost;port=3306;database=contact_manager;user=dbuser;password=dbuser;"

## Launch

dotnet run

## To Do

- Contact CRUD
- Search and Filter