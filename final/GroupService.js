// GroupService.js - Complete working version
(function(window) {
    'use strict';

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
    GroupService.prototype.createGroup = function(name) {
        const group = {
            id: generateGroupId(),
            name: name,
            contactIds: [],
            dateCreated: new Date()
        };

        this.groups.push(group);
        console.log(`👥 Group created: "${name}"`);
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

    // Find group by name
    GroupService.prototype.findGroup = function(name) {
        return this.groups.find(group =>
            group.name.toLowerCase().includes(name.toLowerCase())
        );
    };

    // Get contacts in a specific group (requires ContactService instance)
    GroupService.prototype.getContactsInGroup = function(groupId, contactServiceInstance) {
        const group = this.groups.find(g => g.id === groupId);
        if (!group || !contactServiceInstance) return [];

        // Use the provided ContactService instance (with actual data)
        const allContacts = contactServiceInstance.getAllContacts();
        return group.contactIds.map(contactId => {
            return allContacts.find(contact => contact.id === contactId);
        }).filter(contact => contact !== undefined);
    };

    // Get contacts that are NOT assigned to any groups
    GroupService.prototype.getUnassignedContacts = function(contactServiceInstance) {
        if (!contactServiceInstance) return [];

        const allContacts = contactServiceInstance.getAllContacts();
        const assignedContactIds = new Set();

        // Collect all contact IDs that are in groups
        this.groups.forEach(group => {
            group.contactIds.forEach(contactId => {
                assignedContactIds.add(contactId);
            });
        });

        // Return contacts that are NOT in any group
        return allContacts.filter(contact => !assignedContactIds.has(contact.id));
    };

    // Get all contacts with their group memberships
    GroupService.prototype.getAllContactsWithGroups = function(contactServiceInstance) {
        if (!contactServiceInstance) return [];

        const allContacts = contactServiceInstance.getAllContacts();

        return allContacts.map(contact => {
            // Find all groups this contact belongs to
            const memberOfGroups = this.groups.filter(group =>
                group.contactIds.includes(contact.id)
            );

            return {
                contact: contact,
                groups: memberOfGroups,
                isUnassigned: memberOfGroups.length === 0,
                isInMultipleGroups: memberOfGroups.length > 1
            };
        });
    };

    // Expose the service to global namespace
    window.GroupService = GroupService;

    console.log('🔧 GroupService loaded and available globally');

})(window);