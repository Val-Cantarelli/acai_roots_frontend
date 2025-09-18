# Açaí Roots - Frontend

This is the main repository for the Açaí Roots project, responsible for the web interface (Vue.js).

## Live Project
[🔗 Access here](https://val-cantarelli.github.io/acai_roots/)

## Architecture
The project consists of three repositories:
- **Frontend (this one)**: Web interface built with Vue.js
- **Backend**: REST API in Java (Spring Boot) - [acai_roots_backend](https://github.com/val-cantarelli/acai_roots_backend)
- **Static/Deploy**: Static files and deployment - [acai_roots](https://github.com/val-cantarelli/acai_roots)

The backend is hosted on Fly.io and uses MongoDB Atlas as the database.

## Related Repositories
- [Backend (Spring Boot)](https://github.com/val-cantarelli/acai_roots_backend)
- [Static/Deploy](https://github.com/val-cantarelli/acai_roots)

---

## How to Run the Project

### Install dependencies
```bash
npm install
```

### Development environment
```bash
npm run serve
```

### Build for production
```bash
npm run build
```

### Customization
See [Configuration Reference](https://cli.vuejs.org/config/).
