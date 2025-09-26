# 👥 Step 2: Add GroupService

## 🎯 What You'll Learn
- **Multiple services** working together
- **Service constants** and how to expose them
- **Inter-service communication** basics
- **Load order** importance

## 🛠️ What You'll Build
Add GroupService to manage contact groups:
- ✅ Create groups (Family, Friends, Coworkers)
- ✅ Assign contacts to groups
- ✅ List groups and their members

## 📋 Build Instructions

### 1. Copy Your ContactService
```bash
# Copy your working ContactService.js from step1
cp ../step1/ContactService.js .
```

### 2. Create GroupService.js
**Fill in the TODOs:**

```javascript
// GroupService.js
(function(window) {
    'use strict';

    // TODO: Create constants for group types
    const GROUP_TYPES = {
        FAMILY: 'family',
        FRIENDS: 'friends',
        COWORKERS: 'coworkers'
    };

    // TODO: Private helper function
    function generateGroupId() {
        // Return unique group ID
    }

    // TODO: Constructor function
    function GroupService() {
        // Initialize empty groups array
    }

    // TODO: Create group method
    GroupService.prototype.createGroup = function(name, type) {
        // 1. Create group object: id, name, type, contactIds (empty array), dateCreated
        // 2. Add to this.groups array
        // 3. Console.log success
        // 4. Return group ID
    };

    // TODO: Add contact to group method
    GroupService.prototype.addContactToGroup = function(groupId, contactId) {
        // 1. Find group by groupId
        // 2. Add contactId to group.contactIds (if not already there)
        // 3. Return true/false for success
    };

    // TODO: Get all groups method
    GroupService.prototype.getAllGroups = function() {
        // Return copy of groups array
    };

    // TODO: Get groups by type method
    GroupService.prototype.getGroupsByType = function(type) {
        // Filter groups by type and return matching groups
    };

    // TODO: Expose constants and service
    GroupService.TYPES = GROUP_TYPES;
    window.GroupService = // Your code here

})(window);
```

### 3. Update index.html
**Load both services and test them together:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Step 2: Contact Manager with Groups</title>
    <style>
        button { padding: 10px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 4px; }
        .output { background: #f8f9fa; padding: 15px; margin: 10px 0; font-family: monospace; }
        .section { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>📱 Step 2: Contact Manager with Groups</h1>

    <div class="section">
        <h3>📱 Contacts</h3>
        <button onclick="addSampleContacts()">Add Sample Contacts</button>
        <button onclick="listContacts()">List Contacts</button>
        <div id="contact-output" class="output">Contact operations...</div>
    </div>

    <div class="section">
        <h3>👥 Groups</h3>
        <button onclick="createSampleGroups()">Create Sample Groups</button>
        <button onclick="assignContactsToGroups()">Assign Contacts to Groups</button>
        <button onclick="listGroups()">List Groups</button>
        <div id="group-output" class="output">Group operations...</div>
    </div>

    <!-- TODO: Load services in correct order -->
    <script src="ContactService.js"></script>
    <script src="GroupService.js"></script>

    <script>
        let contactService;
        let groupService;

        document.addEventListener('DOMContentLoaded', function() {
            // TODO: Create both service instances
            contactService = new ContactService();
            groupService = new GroupService();
        });

        function addSampleContacts() {
            // TODO: Add sample contacts and show count
        }

        function createSampleGroups() {
            // TODO: Create Family, Friends, Coworkers groups
            // Use GroupService.TYPES constants
        }

        function assignContactsToGroups() {
            // TODO: Assign contacts to groups realistically
            // Examples:
            // - Someone can be in Friends AND Coworkers (friend who got hired)
            // - Family member can also be in Friends
            // - Use contact names to determine realistic assignments
            // - Don't rely on email domains (unrealistic)

            // Get contact IDs and group IDs, then use addContactToGroup()
            // Remember: One contact can be in multiple groups!
        }

        function listGroups() {
            // TODO: Display all groups and their member counts
        }

        function listContacts() {
            // TODO: Display all contacts
        }
    </script>
</body>
</html>
```

## ✅ Success Criteria
**Step 2 is complete when:**
- ✅ Both ContactService and GroupService load without errors
- ✅ You can create groups with different types
- ✅ You can assign contacts to groups
- ✅ Groups show correct member counts
- ✅ Constants work: `GroupService.TYPES.FAMILY`

## 🔍 Test Your Understanding
```javascript
// Test in console:
console.log(GroupService.TYPES);  // Should show all group types

// Test service independence
const group1 = new GroupService();
const group2 = new GroupService();
// Each should have separate groups array
```

## 🚀 Ready for Step 3?
Next: Add SearchService that uses BOTH ContactService and GroupService!

---
**💡 Need help? Check `../final/` for the complete working version**