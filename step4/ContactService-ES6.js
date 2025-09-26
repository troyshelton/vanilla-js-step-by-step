// ContactService-ES6.js - ES6 Class version (compare with ContactService.js)
(function(window) {
    'use strict';

    // Private helper function (same as prototype version)
    function generateContactId() {
        return 'contact_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    // ES6 Class syntax
    class ContactService {
        constructor() {
            this.contacts = [];
            console.log('✅ ContactService (ES6) initialized');
        }

        // Methods automatically go to prototype
        addContact(name, phone, email) {
            const contact = {
                id: generateContactId(),
                name: name,
                phone: phone,
                email: email,
                dateAdded: new Date()
            };

            this.contacts.push(contact);
            console.log(`📱 Contact added (ES6): ${name} (${phone})`);
            return contact.id;
        }

        findContact(name) {
            return this.contacts.find(contact =>
                contact.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        getAllContacts() {
            return this.contacts.slice();
        }

        removeContact(contactId) {
            const index = this.contacts.findIndex(contact => contact.id === contactId);
            if (index !== -1) {
                const removed = this.contacts.splice(index, 1)[0];
                console.log(`🗑️ Contact removed (ES6): ${removed.name}`);
                return true;
            }
            return false;
        }

        getContactCount() {
            return this.contacts.length;
        }
    }

    // Expose with different name to avoid conflicts
    window.ContactServiceES6 = ContactService;

    console.log('🔧 ContactService (ES6) loaded - available as ContactServiceES6');

})(window);