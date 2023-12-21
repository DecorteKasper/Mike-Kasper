# Lifeguards project
Welcome to the Lifeguards Project, a comprehensive website featuring two distinct platforms tailored for coastal lifeguard teams.
<br/>

## Overview

### Platform One: Head Lifeguard
Platform one empowers the head lifeguard with essential tools to efficiently manage the team. Here's what they can do:
- **Manage Lifeguards**: Easily oversee and manage the lifeguard team.
- **Holiday Management**: Check lifeguards' holiday schedules and preferred months.
- **Zone Assignment**: Assign specific zones for lifeguards to patrol.
- **Task Coordination**: Receive and coordinate tasks efficiently through a to-do system.

### Platform Two: Lifeguards
Platform two is designed to provide lifeguards with the information and tools they need for effective on-site management. Lifeguards can do following:
- **Weather Updates**: Access real-time weather information.
- **Holiday Requests**: Submit and track your holidays.
- **Preferred Months**: Share preferred working months for improved scheduling.
- **Post and Holiday History**: View their own posts and holiday history for reference.
- **Task Management**: Send to-do lists to the head lifeguard.
- **Daily Reports**: Provide daily reports for the head lifeguard.
- **Emergency Contacts**: Easily access important phone numbers when needed.
<br/>

## Getting Started

### Installation
1. Clone the repository to your local machine.
```
  gh repo clone DecorteKasper/Mike-Kasper
```
2. Navigate to the project directory
3. Install project dependencies in the pwa and lifeguard folders with `npm i`
<br/>

### Database Configuration
1. Run the api folder `npm run dev:api`
2. Open the app "MongoDB Compass"
3. Make a new connection with the URI `mongodb://localhost:27027`
4. Go to the api folder `cd packages/api`
5. Run following command to fill the database:
```
  npx nestjs-command seed:database:all
```
6. Stop the running api folder `ctrl+c`
<br/>

### Running the project
Start the project
```
  npm run dev
```
