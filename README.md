# NextAuth.js Demo Project

This is a demo project showcasing authentication with NextAuth.js, including role-based access control (user and admin roles) and a product management dashboard for admin users.

## Features

- User authentication with NextAuth.js
- Role-based access control (user and admin roles)
- Protected routes based on authentication status and user role
- Admin dashboard with product management (CRUD operations)
- Integration with external API (Platzi Fake Store API)
- Search and pagination functionality

## Demo Credentials

- Admin User:
  - Email: admin@example.com
  - Password: admin123

- Regular User:
  - Email: user@example.com
  - Password: user123

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory with the following content:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-for-jwt-encryption
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app/api/auth/[...nextauth]/route.ts` - NextAuth.js API route handler
- `/src/middleware.ts` - Middleware for route protection
- `/src/providers/SessionProvider.tsx` - NextAuth.js session provider
- `/src/types/next-auth.d.ts` - TypeScript declarations for NextAuth.js
- `/src/app/login/page.tsx` - Login page
- `/src/app/register/page.tsx` - Registration page
- `/src/app/home/page.tsx` - User home page
- `/src/app/admin/page.tsx` - Admin dashboard
- `/src/components/Navigation.tsx` - Navigation component
- `/src/components/ProductTable.tsx` - Product table component
- `/src/components/ProductForm.tsx` - Product form component
- `/src/services/productService.ts` - Service for product API calls
- `/src/types/product.ts` - Product type definitions

## Technologies Used

- Next.js 15
- TypeScript
- NextAuth.js
- React
- Tailwind CSS
- Axios

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
