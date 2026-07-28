# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please
report it responsibly by emailing the project maintainers.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send a detailed report including:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt within 48 hours and work on a fix.

## Security Best Practices

When deploying this application:

1. **Environment Variables**: Never commit secrets to the repository. Use
   environment variables for all sensitive configuration.

2. **API Keys**: Rotate API keys regularly and use the principle of least
   privilege.

3. **Dependencies**: Keep all dependencies up to date. Run security audits:
   ```bash
   npm audit
   ```

4. **HTTPS**: Always use HTTPS in production. The application sets security
   headers via nginx configuration.

5. **Authentication**: Use strong password policies and enable multi-factor
   authentication where possible.
