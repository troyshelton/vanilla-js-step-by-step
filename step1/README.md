# 📝 Step 1: Build Your First ContactService

## 🎯 What You'll Learn
- **IIFE pattern** - Keep code private while exposing services
- **Prototype pattern** - Share methods between instances efficiently
- **Global namespace** - How services become available everywhere
- **Instance data** - Each service instance has its own data

## 🛠️ What You'll Build
A simple ContactService with clean manual input:
- ✅ Add contacts (name, phone, email)
- ✅ Show all contacts
- ✅ Search contacts
- ✅ Clear all contacts

## 📋 Files in This Step
- **ContactService.js** - Complete working service (reference)
- **index.html** - Working interface to test the service
- **README.md** - This guide with learning objectives

## 🚀 How to Use This Step

### Option 1: Study the Working Code
1. **Open index.html** in your browser
2. **Try the interface** - Add contacts manually
3. **Study ContactService.js** - See how IIFE and prototype work
4. **Open browser console** (F12) - See service logging

### Option 2: Build It Yourself
If you want to code it from scratch, follow this template:

### 1. Create ContactService.js
**Basic structure:**

```javascript
// ContactService.js
(function(window) {
    'use strict';

    // TODO: Create a private helper function
    function generateContactId() {
        // Return a unique ID using Date.now() and random numbers
    }

    // TODO: Create the ContactService constructor
    function ContactService() {
        // Initialize an empty contacts array
    }

    // TODO: Add method to add a contact
    ContactService.prototype.addContact = function(name, phone, email) {
        // 1. Create contact object with: id, name, phone, email, dateAdded
        // 2. Add to this.contacts array
        // 3. Console.log success message
        // 4. Return the contact ID
    };

    // TODO: Add method to find contact
    ContactService.prototype.findContact = function(name) {
        // Search this.contacts for name (case-insensitive)
        // Return contact object or null
    };

    // TODO: Add method to get all contacts
    ContactService.prototype.getAllContacts = function() {
        // Return copy of contacts array (use .slice())
    };

    // TODO: Expose globally
    window.ContactService = // Your code here

})(window);
```

### 2. Create index.html
**Fill in the TODOs:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Step 1: Contact Manager</title>
    <style>
        button { padding: 10px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 4px; }
        .output { background: #f8f9fa; padding: 15px; margin: 10px 0; font-family: monospace; }
    </style>
</head>
<body>
    <h1>📱 Step 1: Contact Manager</h1>

    <button onclick="addSampleContacts()">Add Sample Contacts</button>
    <button onclick="listContacts()">List All Contacts</button>
    <button onclick="findDemo()">Find Contact Demo</button>

    <div id="output" class="output">Ready to test ContactService!</div>

    <!-- TODO: Load your ContactService.js -->
    <script src="ContactService.js"></script>

    <script>
        let contactService;

        document.addEventListener('DOMContentLoaded', function() {
            // TODO: Create ContactService instance
            contactService = new ContactService();
            console.log('ContactService ready!');
        });

        function addSampleContacts() {
            const output = document.getElementById('output');

            // TODO: Add 3 sample contacts
            // Example: contactService.addContact('John Smith', '555-0123', 'john@email.com');

            output.textContent = `✅ Added contacts! Total: ${contactService.getAllContacts().length}`;
        }

        function listContacts() {
            const output = document.getElementById('output');

            // TODO: Get all contacts and display them
            const contacts = contactService.getAllContacts();

            output.textContent = `📱 Contacts (${contacts.length}):\n`;
            // TODO: Loop through contacts and display name, phone, email
        }

        function findDemo() {
            const output = document.getElementById('output');

            // TODO: Try finding a contact by name
            const found = contactService.findContact('john');

            if (found) {
                output.textContent = `✅ Found: ${found.name} - ${found.phone}`;
            } else {
                output.textContent = '❌ Contact not found';
            }
        }
    </script>
</body>
</html>
```

## ✅ Success Criteria
**Step 1 is complete when:**
- ✅ ContactService.js loads without errors
- ✅ You can add contacts and see console messages
- ✅ List contacts shows all added contacts
- ✅ Find contact works with partial names
- ✅ Multiple ContactService instances work independently

## 🔍 Test Your Understanding
Try these in browser console:
```javascript
// Test global access
console.log(typeof ContactService);  // Should be "function"

// Create independent instances
const service1 = new ContactService();
const service2 = new ContactService();

service1.addContact('Test1', '111', 'test1@email.com');
service2.addContact('Test2', '222', 'test2@email.com');

console.log(service1.getAllContacts().length);  // Should be 1
console.log(service2.getAllContacts().length);  // Should be 1
```

## 🚀 Ready for Step 2?
Once this works, you'll add GroupService and learn about service dependencies!

---
**💡 Tip**: This step has working code - study ContactService.js and index.html to learn!