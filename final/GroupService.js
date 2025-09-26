// GroupService.js - Complete working version
(function(window) {
    'use strict';

    // Private constants for group types
    const GROUP_TYPES = {
        FAMILY: 'family',
        FRIENDS: 'friends',
        COWORKERS: 'coworkers'
    };

    // Private helper function
    function generateGroupId() {
        return 'group_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    // Constructor function for GroupService
    function GroupService() {
        this.groups = [];
        console.log('✅ GroupService initialized');
    }

    // Create a new group
    GroupService.prototype.createGroup = function(name, type) {
        const group = {
            id: generateGroupId(),
            name: name,
            type: type || GROUP_TYPES.FRIENDS,
            contactIds: [],
            dateCreated: new Date()
        };

        this.groups.push(group);
        console.log(`👥 Group created: "${name}" (${type})`);
        return group.id;
    };

    // Add contact to group
    GroupService.prototype.addContactToGroup = function(groupId, contactId) {
        const group = this.groups.find(g => g.id === groupId);
        if (group && !group.contactIds.includes(contactId)) {
            group.contactIds.push(contactId);
            console.log(`➕ Contact ${contactId} added to group "${group.name}"`);
            return true;
        }
        return false;
    };

    // Remove contact from group
    GroupService.prototype.removeContactFromGroup = function(groupId, contactId) {
        const group = this.groups.find(g => g.id === groupId);
        if (group) {
            const index = group.contactIds.indexOf(contactId);
            if (index !== -1) {
                group.contactIds.splice(index, 1);
                console.log(`➖ Contact ${contactId} removed from group "${group.name}"`);
                return true;
            }
        }
        return false;
    };

    // Get all groups
    GroupService.prototype.getAllGroups = function() {
        return this.groups.slice();
    };

    // Get groups by type
    GroupService.prototype.getGroupsByType = function(type) {
        return this.groups.filter(group => group.type === type);
    };

    // Find group by name
    GroupService.prototype.findGroup = function(name) {
        return this.groups.find(group =>
            group.name.toLowerCase().includes(name.toLowerCase())
        );
    };

    // Get contacts in a specific group (requires ContactService)
    GroupService.prototype.getContactsInGroup = function(groupId) {
        // Check if ContactService is available
        if (typeof window.ContactService === 'undefined') {
            console.error('❌ ContactService not available! Load ContactService.js first.');
            return [];
        }

        const group = this.groups.find(g => g.id === groupId);
        if (!group) return [];

        // Create a ContactService instance to get contact details
        const contactService = new window.ContactService();
        return group.contactIds.map(contactId => {
            return contactService.getAllContacts().find(contact => contact.id === contactId);
        }).filter(contact => contact !== undefined);
    };

    // Expose constants
    GroupService.TYPES = GROUP_TYPES;

    // Expose the service to global namespace
    window.GroupService = GroupService;

    console.log('🔧 GroupService loaded and available globally');

})(window);