// SearchService.js - Complete working version
(function(window) {
    'use strict';

    // Constructor function for SearchService
    function SearchService(contactService, groupService) {
        // Check dependencies
        if (!contactService || typeof contactService.getAllContacts !== 'function') {
            throw new Error('❌ SearchService requires a valid ContactService instance');
        }
        if (!groupService || typeof groupService.getAllGroups !== 'function') {
            throw new Error('❌ SearchService requires a valid GroupService instance');
        }

        this.contactService = contactService;
        this.groupService = groupService;
        console.log('✅ SearchService initialized with dependencies');
    }

    // Search contacts by name, phone, or email
    SearchService.prototype.searchContacts = function(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return [];
        }

        const allContacts = this.contactService.getAllContacts();
        const term = searchTerm.toLowerCase();

        return allContacts.filter(contact =>
            contact.name.toLowerCase().includes(term) ||
            contact.phone.includes(term) ||
            contact.email.toLowerCase().includes(term)
        );
    };

    // Search groups by name or type
    SearchService.prototype.searchGroups = function(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return [];
        }

        const allGroups = this.groupService.getAllGroups();
        const term = searchTerm.toLowerCase();

        return allGroups.filter(group =>
            group.name.toLowerCase().includes(term) ||
            group.type.toLowerCase().includes(term)
        );
    };

    // Find contacts in a specific group type (family, friends, coworkers)
    SearchService.prototype.getContactsByGroupType = function(groupType) {
        const groups = this.groupService.getGroupsByType(groupType);
        const allContacts = this.contactService.getAllContacts();
        const contactsInType = [];

        groups.forEach(group => {
            group.contactIds.forEach(contactId => {
                const contact = allContacts.find(c => c.id === contactId);
                if (contact && !contactsInType.some(c => c.id === contact.id)) {
                    contactsInType.push(contact);
                }
            });
        });

        return contactsInType;
    };

    // Advanced search - contacts AND their groups
    SearchService.prototype.searchWithGroups = function(searchTerm) {
        const matchingContacts = this.searchContacts(searchTerm);
        const allGroups = this.groupService.getAllGroups();

        return matchingContacts.map(contact => {
            // Find groups this contact belongs to
            const contactGroups = allGroups.filter(group =>
                group.contactIds.includes(contact.id)
            );

            return {
                contact: contact,
                groups: contactGroups
            };
        });
    };

    // Get statistics about contacts and groups
    SearchService.prototype.getStats = function() {
        const totalContacts = this.contactService.getContactCount();
        const totalGroups = this.groupService.getAllGroups().length;
        const groupTypes = this.groupService.getAllGroups().reduce((types, group) => {
            types[group.type] = (types[group.type] || 0) + 1;
            return types;
        }, {});

        return {
            totalContacts: totalContacts,
            totalGroups: totalGroups,
            groupTypeBreakdown: groupTypes,
            averageContactsPerGroup: totalGroups > 0 ? Math.round(totalContacts / totalGroups * 10) / 10 : 0
        };
    };

    // Static method to create SearchService with global services
    SearchService.createWithGlobalServices = function() {
        // Check if required services are available globally
        if (typeof window.ContactService === 'undefined') {
            throw new Error('❌ ContactService not found! Load ContactService.js first.');
        }
        if (typeof window.GroupService === 'undefined') {
            throw new Error('❌ GroupService not found! Load GroupService.js first.');
        }

        // Create instances from global services
        const contactService = new window.ContactService();
        const groupService = new window.GroupService();

        console.log('🔗 SearchService created with global services');
        return new SearchService(contactService, groupService);
    };

    // Expose the service to global namespace
    window.SearchService = SearchService;

    console.log('🔧 SearchService loaded and available globally');

})(window);