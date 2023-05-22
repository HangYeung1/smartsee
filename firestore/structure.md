# Database Structure

```
Database
| - companies
| | - company 1
| | - company 2
| | - ...
| - users
| | - user 1
| | - user 2
| | - ...
```

# Company Format

```
Company ID
| - name: string
| - ticker: string
| - industry: string
| - description: string
| - imageURL: string
| - esg: number
| - esgEnvironmental: number
| - esgSocial: number
| - esgGovernance: number
| - controversy: number
```

# User Format

```
User ID
| - collections
| | - _displayMode
| | | - Just Updated: boolean
| | | - Recently Viewed: boolean
| | | - Bookmarks: boolean
| | - recentlyViewed: string[]
| | - bookmarks: string[]
```

# Security Rules for Database

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /companies/{company} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /users/{user} {
    	allow read, write: if request.auth != null && request.auth.uid == user;
    }

  }
}
```
