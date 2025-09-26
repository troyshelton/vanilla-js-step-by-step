# 🔍 Step 3: Add SearchService - Service Dependencies

## 🎯 What You'll Learn
- **Service dependencies** - How services use other services
- **Load order critical importance** - Why sequence matters
- **Error handling** for missing dependencies
- **Cross-service communication** through global namespace

## 🛠️ What You'll Build
SearchService that uses BOTH ContactService and GroupService:
- ✅ Search contacts by name, phone, or email
- ✅ Search groups by name or type
- ✅ Get contacts by group type (family, friends, coworkers)
- ✅ Generate statistics using both services

## 📋 Build Instructions

### 1. Copy Your Previous Work
```bash
# Copy your working services from step2
cp ../step2/ContactService.js .
cp ../step2/GroupService.js .
```

### 2. Create SearchService.js
**This service DEPENDS on the other two - fill in TODOs:**

```javascript
// SearchService.js
(function(window) {
    'use strict';

    // TODO: Constructor that accepts other service instances
    function SearchService(contactService, groupService) {
        // TODO: Check that contactService is valid
        if (!contactService || typeof contactService.getAllContacts !== 'function') {
            throw new Error('❌ SearchService requires ContactService');
        }

        // TODO: Check that groupService is valid
        if (!groupService || typeof groupService.getAllGroups !== 'function') {
            throw new Error('❌ SearchService requires GroupService');
        }

        // TODO: Store the service instances
        this.contactService = contactService;
        this.groupService = groupService;

        console.log('✅ SearchService initialized with dependencies');
    }

    // TODO: Search contacts method
    SearchService.prototype.searchContacts = function(searchTerm) {
        // 1. Get all contacts from contactService
        // 2. Filter by name, phone, or email containing searchTerm
        // 3. Return matching contacts
    };

    // TODO: Search groups method
    SearchService.prototype.searchGroups = function(searchTerm) {
        // 1. Get all groups from groupService
        // 2. Filter by name or type containing searchTerm
        // 3. Return matching groups
    };

    // TODO: Get contacts by group type
    SearchService.prototype.getContactsByGroupType = function(groupType) {
        // 1. Get groups of the specified type
        // 2. Get all contact IDs from those groups
        // 3. Get actual contact objects from contactService
        // 4. Return unique contacts (no duplicates)
        // Note: Same person might appear in multiple groups (realistic!)
    };

    // TODO: Get unassigned contacts
    SearchService.prototype.getUnassignedContacts = function() {
        // Use groupService.getUnassignedContacts() method
        // Returns contacts not assigned to any groups yet
    };

    // TODO: Get all contacts with group information
    SearchService.prototype.getAllContactsWithGroupInfo = function() {
        // Use groupService.getAllContactsWithGroups() method
        // Shows each contact with their group memberships
    };

    // TODO: Static method to use global services
    SearchService.createWithGlobalServices = function() {
        // 1. Check if window.ContactService exists
        // 2. Check if window.GroupService exists
        // 3. Create instances of both
        // 4. Return new SearchService with those instances
    };

    // TODO: Expose globally
    window.SearchService = SearchService;

})(window);
```

### 3. Create index.html
**Load all three services in correct order:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Step 3: Contact Manager with Search</title>
    <style>
        button { padding: 10px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 4px; }
        .output { background: #f8f9fa; padding: 15px; margin: 10px 0; font-family: monospace; white-space: pre-wrap; }
        .section { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; }
        input { padding: 8px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🔍 Step 3: Contact Manager with Search</h1>

    <div class="section">
        <h3>🚀 Quick Setup</h3>
        <button onclick="setupEverything()">Setup Sample Data</button>
        <div id="setup-output" class="output">Click to setup sample contacts and groups</div>
    </div>

    <div class="section">
        <h3>🔍 Search</h3>
        <input type="text" id="search-input" placeholder="Search..." value="john">
        <button onclick="searchContacts()">Search Contacts</button>
        <button onclick="searchGroups()">Search Groups</button>
        <div id="search-output" class="output">Search results will appear here</div>
    </div>

    <div class="section">
        <h3>👥 Group Filtering</h3>
        <button onclick="showFamily()">Show Family</button>
        <button onclick="showFriends()">Show Friends</button>
        <button onclick="showCoworkers()">Show Coworkers</button>
        <div id="filter-output" class="output">Group filtering results</div>
    </div>

    <!-- TODO: Load services in CORRECT order (very important!) -->
    <!-- Think: Which service depends on which? -->
    <script src="ContactService.js"></script>
    <script src="GroupService.js"></script>
    <script src="SearchService.js"></script>

    <script>
        let contactService, groupService, searchService;

        document.addEventListener('DOMContentLoaded', function() {
            try {
                // TODO: Create all three service instances
                contactService = new ContactService();
                groupService = new GroupService();
                // TODO: Use SearchService.createWithGlobalServices() method
                searchService = SearchService.createWithGlobalServices();

                console.log('🎉 All services ready!');
            } catch (error) {
                console.error('❌ Setup failed:', error.message);
            }
        });

        function setupEverything() {
            // TODO: Add sample contacts
            // TODO: Create sample groups
            // TODO: Assign contacts to groups
            // TODO: Show success message with counts
        }

        function searchContacts() {
            const searchTerm = document.getElementById('search-input').value;
            // TODO: Use searchService.searchContacts()
            // TODO: Display results
        }

        function searchGroups() {
            const searchTerm = document.getElementById('search-input').value;
            // TODO: Use searchService.searchGroups()
            // TODO: Display results
        }

        function showFamily() {
            // TODO: Use searchService.getContactsByGroupType('family')
            // TODO: Display family contacts
        }

        // TODO: Implement showFriends() and showCoworkers()
    </script>
</body>
</html>
```

## ⚠️ Common Mistakes to Learn From

### **Wrong Load Order:**
```html
<!-- ❌ This will fail! -->
<script src="SearchService.js"></script>  <!-- Needs others first -->
<script src="ContactService.js"></script>
<script src="GroupService.js"></script>
```

### **Missing Dependency Check:**
```javascript
// ❌ Don't do this:
const searchService = new SearchService();  // No dependencies passed

// ✅ Do this:
const searchService = SearchService.createWithGlobalServices();
```

## ✅ Success Criteria
**Step 3 is complete when:**
- ✅ All three services load without errors
- ✅ You can search contacts and groups
- ✅ Group type filtering works (family, friends, coworkers)
- ✅ Services communicate properly
- ✅ Dependencies are handled gracefully

## 🔍 Test Dependencies
Try this experiment:
```javascript
// In console, temporarily break dependency:
const original = window.ContactService;
delete window.ContactService;

// Try creating SearchService - should fail gracefully
try {
    const search = SearchService.createWithGlobalServices();
} catch (error) {
    console.log('✅ Dependency check worked:', error.message);
}

// Restore it
window.ContactService = original;
```

## 🚀 Ready for Step 4?
Final step: Convert ContactService to ES6 classes and compare!

---
**🎉 Congratulations! You've completed the core tutorial and built a complete Contact Manager!**
**Optional: Continue to Step 4 (prototype vs ES6) or Step 5 (update/delete operations)**