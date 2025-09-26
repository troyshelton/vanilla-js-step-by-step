// ContactService.js - Complete working version
(function(window) {
    'use strict';

    // Private helper function to generate unique contact IDs
    function generateContactId() {
        return 'contact_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    // Constructor function for ContactService
    function ContactService() {
        this.contacts = [];
        console.log('✅ ContactService initialized');
    }

    // Add a new contact
    ContactService.prototype.addContact = function(name, phone, email) {
        const contact = {
            id: generateContactId(),
            name: name,
            phone: phone,
            email: email,
            dateAdded: new Date()
        };

        this.contacts.push(contact);
        console.log(`📱 Contact added: ${name} (${phone})`);
        return contact.id;
    };

    // Find a contact by name
    ContactService.prototype.findContact = function(name) {
        return this.contacts.find(contact =>
            contact.name.toLowerCase().includes(name.toLowerCase())
        );
    };

    // Get all contacts
    ContactService.prototype.getAllContacts = function() {
        return this.contacts.slice(); // Return copy to prevent external modification
    };

    // Remove a contact by ID
    ContactService.prototype.removeContact = function(contactId) {
        const index = this.contacts.findIndex(contact => contact.id === contactId);
        if (index !== -1) {
            const removed = this.contacts.splice(index, 1)[0];
            console.log(`🗑️ Contact removed: ${removed.name}`);
            return true;
        }
        return false;
    };

    // Get contact count
    ContactService.prototype.getContactCount = function() {
        return this.contacts.length;
    };

    // Expose the service to global namespace
    window.ContactService = ContactService;

    console.log('🔧 ContactService loaded and available globally');

})(window);