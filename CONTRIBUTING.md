# Contributing

Thank you for considering contributing! This project welcomes contributions
from everyone.

## How to Contribute

### 1. Reporting Issues

- Check if the issue already exists
- Use a clear and descriptive title
- Provide steps to reproduce the issue
- Include relevant logs, screenshots, or error messages

### 2. Feature Requests

- Describe the feature and why it's valuable
- Explain how it should work
- Consider if it fits within the project scope

### 3. Code Contributions

#### Setup

```bash
git clone https://github.com/zenzemie/Acme.git
cd Acme
make setup
```

#### Development Workflow

1. Create a branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run checks:
   ```bash
   make typecheck
   make build
   ```
4. Commit with a clear message
5. Push and open a Pull Request

#### Pull Request Guidelines

- Keep PRs focused on a single change
- Include tests if applicable
- Update documentation if needed
- Ensure all checks pass
- Reference any related issues

## Code Style

- TypeScript: Strict mode, follow existing patterns
- Components: Use the existing shadcn/ui pattern
- CSS: Use Tailwind utility classes
- Git: Use conventional commit messages

## Code of Conduct

This project follows a Code of Conduct. By participating, you agree to
maintain a respectful and inclusive environment.
