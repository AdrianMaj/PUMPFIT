<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AdrianMaj/PUMPFIT">
    <img src="/public/logo.svg" alt="PUMPFIT App Logo" width="180" height="100">
  </a>

<h3 align="center">PUMPFIT</h3>

  <p align="center">
     An app for personal trainers, and for those who are looking for their trainer.
    <br />
    <a href="https://github.com/AdrianMaj/PUMPFIT"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://pumpfit.vercel.app/">View Live Site</a>
    ·
    <a href="https://github.com/AdrianMaj/PUMPFIT/issues">Report Bug</a>
    ·
    <a href="https://github.com/AdrianMaj/PUMPFIT/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![PUMPFIT Main page screenshot][product-screenshot]](/images/screenshot.png)

PUMPFIT allows you to create a trainer or user account. A trainer account can publish advertisements that can be answered by those looking for trainers. Users can publish testimonials about trainers, which will be visible to all page visitors. The application also allows real-time communication between users, editing account details such as email, password, etc., password recovery, ad filtering and several other features.

See <a href="#usage"><b>Usage</b></a> for more information about the application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Typescript][Typescript]][Typescript-url]
- [![Socket.io][Socket.io]][Socket.io-url]
- [![Prisma][Prisma]][Prisma-url]
- [![Cloudinary][Cloudinary]][Cloudinary-url]
- [![Postgres][Postgres]][Postgres-url]
- [![Vercel][Vercel]][Vercel-url]
- [![Sass][Sass]][Sass-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/AdrianMaj/PUMPFIT.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API'
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To unlock the main part of the application - the dashboard, you need to create your own account or log in to any of the following:

| E-mail              | Password       | Account Type |
| ------------------- | -------------- | ------------ |
| user@example.com    | pUmPf1TUs3r!   | User         |
| trainer@example.com | pUmPf1Ttr@1n3r | Trainer      |

### Creating Account

Not filled yet.

### Logging in

Not filled yet.

### Dashboard

After logging in, you should see a dashboard with information about your account, and a side menu on the left with dashboard functionalities:

![PUMPFIT Dashboard screenshot](/images/dashboard.png)

The menu contains different options depending on the type of account.

<h3>Trainer:</h3>

![Trainer menu options](/images/trainerMenu.png)

- <b>Dashboard</b>
  - Shows your account information and statistics.
  - Includes some page shortcuts, and logout button.
- <b>Messages</b>
  - Allows you to chat with users who have contacted you.
  - Chat allows users to view its history, send messages, photos, files and emoji in real time.
  - It does not allow you to communicate with other trainers, or users who have not contacted you before.
  - Allows filtering of users.
- <b>My profile</b>
  - Allows you to add, edit and delete announcements from the homepage.
  - Allows you to add a photo that will appear in the announcement, and other information such as description, categories, experience and price.
  - Allows you to preview your announcement before publishing.
  - If your announcement is not published, users won't be able to message you!
- <b>Promote</b>
  - Shows options for purchasing the promoting, and allows you to contact the administrator by email to purchase the promoting.
- <b>Account settings</b>
  - Allows you to upload profile picture, which will be seen in messages.
  - Allows you to change your name, email and password.
  - You can delete your account from here.

<h3>User:</h3>

![User menu options](/images/userMenu.png)

- <b>Dashboard</b>
  - Shows your account information and statistics.
  - Includes some page shortcuts, and logout button.
- <b>Messages</b>
  - Allows you to chat with all trainers over the page, who has published their announcement.
  - Chat allows users to view its history, send messages, photos, files and emoji in real time.
  - Allows filtering of trainers.
- <b>Account settings</b>
  - Allows you to upload profile picture, which will be seen in messages.
  - Allows you to change your name, email and password.
  - You can delete your account from here.

### Our trainers

The "Our trainers" subpage is where all the announcements of trainers who have published them are displayed.

![Our trainers subpage](/images/ourTrainers.png)

On the page, in addition to the list of trainers itself, we also have a bar that allows us to filter trainers' announcements.

Each ad includes a photo, name, description and categories of the trainer. It also includes 2 buttons, one takes you to the trainer's "details" sub-page and the other allows you to contact the trainer.

### Details

The "Details" subpage shows more information about the trainer, and testimonials about him.

![Details subpage](/images/details.png)

Depending on whether you are logged in, and what type of account you have, the site enables different functionalities.

- <b>Not logged-in user</b>
  - As a not logged-in user, you have the ability to view the announcement, and reviews of the trainer. After pressing the "Message me now" button, you will be asked to log in.
- <b>Trainer</b>
  - As a trainer, you have the ability to view the announcement, and reviews of the trainer. The "Message me now" button is invisible to you, as trainers cannot contact other trainers.
- <b>User</b>
  - In addition to viewing the announcement, users can add their opinions about the trainer, which will then be visible to everyone in the form of a slider.

To add a testimonial as a user, press the "Add testimonial" button, which will take us to the page responsible for inserting testimonials.

![Testimonials slider](/images/testimonials.png)

On the site there is a form for adding testimonials. We can choose the number of stars, the title and the content of the testimonial.
The form looks as follows:

![Testimonial add form](/images/testimonialForm.png)

After submiting the form, you'll be redirected to the details page, and your testimonial will be added.

![Testimonial added](/images/testimonialAdded.png)

As you can see, "Add testimonial" button was replaced with "Edit your testimonial". From now on you can edit your testimonial using the same form as adding a testimonial.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Main page and UI
  - [x] Promoted dynamic section
  - [x] FAQ dynamic section
- [x] Create account functionality
  - [x] Email verification
- [x] Login functionality
  - [x] Reset password feature
  - [x] Logout feature
  - [x] Credentials authorization
  - [x] Account session
- [x] Dashboard
  - [x] Show stats and info on main dashboard
  - [x] Change account settings and info
  - [x] Publish an announcement
    - [x] Unpublish an announcement
    - [x] Change announcement data
  - [x] Real-time messages
    - [x] Filtering users
    - [x] Last message info
    - [x] Saving chat history
    - [x] Emoji picker
    - [x] Image upload
    - [x] Message image modal
    - [x] User activity time
    - [x] User activity handling
- [x] Announcement list
  - [x] Filtering announcements
  - [x] Announcement details
    - [x] Adding testimonials
    - [x] Testimonial Slider
  - [x] Messaging trainer from announcement

See the [open issues](https://github.com/AdrianMaj/PUMPFIT/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTACT -->

## Contact

Your Name - [@adrianmaj1122](https://twitter.com/adrianmaj1122) - adrianmaj1122@gmail.com

Project Link: [https://github.com/AdrianMaj/PUMPFIT](https://github.com/AdrianMaj/PUMPFIT)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/AdrianMaj/PUMPFIT.svg?style=for-the-badge
[contributors-url]: https://github.com/AdrianMaj/PUMPFIT/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AdrianMaj/PUMPFIT.svg?style=for-the-badge
[forks-url]: https://github.com/AdrianMaj/PUMPFIT/network/members
[stars-shield]: https://img.shields.io/github/stars/AdrianMaj/PUMPFIT.svg?style=for-the-badge
[stars-url]: https://github.com/AdrianMaj/PUMPFIT/stargazers
[issues-shield]: https://img.shields.io/github/issues/AdrianMaj/PUMPFIT.svg?style=for-the-badge
[issues-url]: https://github.com/AdrianMaj/PUMPFIT/issues
[license-shield]: https://img.shields.io/github/license/AdrianMaj/PUMPFIT.svg?style=for-the-badge
[license-url]: https://github.com/AdrianMaj/PUMPFIT/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/adrianmaj
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Typescript]: https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF
[Typescript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Socket.io]: https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101
[Socket.io-url]: https://socket.io/
[Cloudinary]: https://img.shields.io/badge/Cloudinary-3448c5?style=for-the-badge&logo=cloudinary&badgeColor=3448c5
[Cloudinary-url]: https://cloudinary.com/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org.pl/
[Sass]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[Sass-url]: https://sass-lang.com/
