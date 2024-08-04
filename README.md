# JagoAyam: Restaurant Menu Information Website

## Description

**JagoAyam** is a website that provides detailed information about the food offered by restaurants and companies. It features a robust Content Management System (CMS) for managing the menu items, categories, and staff members. The public website includes features like pagination, filtering, and search to enhance user experience.


## Deploy
### Public Site:
https://astrono.my.id/ or https://jago-ayam.web.app/


### CMS Site:
https://admin.astrono.my.id/

  ```bash
  admin@mail.com
  12345
  ```

## Key Features

### Public Website

- **Pagination**: Easily navigate through multiple pages of menu items.
- **Filter**: Filter menu items based on various criteria such as category and latest.
- **Search**: Search for specific dishes or categories to quickly find what you’re looking for.

### CMS (Content Management System)

- **User Management**: Add, edit, and delete staff users with different access levels.
- **Dashboard**: Display key information and statistics about the menu items and categories.
- **Category Management**: Add, edit, and delete food categories.
- **Cuisine Management**: Add, edit, and delete menu items (cuisines), including the ability to upload images.
- **Image Upload**: Upload and manage images for menu items to make the menu visually appealing.

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm i
   node --watch app
   ```
2. Start the public site:
   ```bash
   cd client/public-site
   npm i
   npm run dev
   ```
3. Start the cms site:
   ```bash
   cd client/cms-site
   npm i
   npm run dev
   ```

## API Documentation

API documentation can be found in the `server` folder.

### Running Tests

To run tests for the server:

```bash
cd server
npm run test
```

## Screenshoot
### Public Site
![public](https://res.cloudinary.com/dszhu92hc/image/upload/v1722797068/Untitled_design_1_kuhs1m.png)
### CMS Site
![cms](https://res.cloudinary.com/dszhu92hc/image/upload/v1722797066/Untitled_design_2_ugu1qk.png)