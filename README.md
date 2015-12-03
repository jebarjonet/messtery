# Messtery
**A dashboard to manage personal and sensitive data that are hard to remember and lost among papers on the desk**

## Content

- [Technologies](#technologies)
- [Needs](#needs)
- [Installation](#installation)
- [Uses](#uses)
- [Features](#features)

## Technologies

- [Meteor](https://meteor.com/)
- [Meteor Up](https://github.com/arunoda/meteor-up) if you want to deploy it

## Needs

- **Google** : API public key (for API **Google Maps Geocoding API**)
- **Mapbox** : API public key + project ID
- **Mailgun** or other mail sender/receiver provider : Domain registered on Mailgun for example

## Installation
- Make sure you have installed Meteor
- Copy `settings.json.dist` to `settings.json` and edit its content
- Follow **local** or **server** instructions below

### Local
- Run `meteor --settings settings.json`
- Go to `/boot` to boot the app (will create the admin user)

### Server with Meteor Up
- Copy `mup.json.dist` to `mup.json` and edit its content
- Deploy
- Go to `/boot` to boot the app (will create the admin user)

## Uses
### Accounts
Multiple users can have their own accounts and interact with owner data.

![accounts](https://cloud.githubusercontent.com/assets/4401230/10879491/96f1efc0-8154-11e5-9419-63be2f19b7fe.PNG)

### Hosting
Files hosting kept private to owner. They can be encrypted to ensure better data privacy. Folders/files system.

![hosting](https://cloud.githubusercontent.com/assets/4401230/10879509/b492651e-8154-11e5-8900-45c1d63f9adc.png)

Encrypted data are displayed with a lock.

![hosting2](https://cloud.githubusercontent.com/assets/4401230/10879511/b4a664a6-8154-11e5-82c4-a9221e09bf25.png)

### Logins
"Hard to remember" identifiers and passwords are kept encrypted in database. Simple secured memo.

![login](https://cloud.githubusercontent.com/assets/4401230/10879516/b826e146-8154-11e5-87b9-f42eff52c5f6.PNG)

### Places
Places needing their memo, maybe an address, a door code or even contact location.

![places](https://cloud.githubusercontent.com/assets/4401230/10879517/b8397432-8154-11e5-888d-d855b787fad3.PNG)

Places belong to categories that can also be edited.

![categories](https://cloud.githubusercontent.com/assets/4401230/10879508/b47d79c4-8154-11e5-8f21-63a46d5bc125.PNG)

### Profile
The connected user can access its profile to use some basic functions such as password update or multiple clients logout.

![profile](https://cloud.githubusercontent.com/assets/4401230/10879518/b85bb9e8-8154-11e5-83c2-9422dc1dc094.PNG)

## Features
### Enroll users
The ability to invite new users by sending them a enrollment email.

### Roles
Users are limited in their actions by the roles the owner gave them.

### Encryption
Each secured content is encrypted using a AES-256 algorithm with data unique salt + 128 bits user key, itself encrypted using user password, salt and IV.
