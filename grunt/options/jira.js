'use strict';

var deployTime = require('../helpers/get-deploy-datetime');
var stagedOrClosedStatuses = '(Closed,"In APS Stage Scheduling Queue",' +
    '"In WebSys Stage Deploy Queue","Deployed to Stage, ' +
    'Waiting on Load Test Results","All Tests Passed, ' +
    'Ready for Deploy Meeting", "Ready for Deploy ")';

// JS style guide
module.exports = {
    searchOpenDeployTicket: {
        options: {
            type: 'search',
            query:
                'issuetype = "Code Deployment Request" AND ' +
                'summary ~ "\\"<%= currentFile.ticketTitle %>\\"" AND ' +
                'status NOT IN ' + stagedOrClosedStatuses + ' ' +
                'ORDER BY updated DESC',
            optional: {
                fields: [
                    'customfield_10215', // Approved MD5
                    'customfield_10360' // Deploy time
                ]
            },
            config: 'jira.deployTickets.openSearch'
        }
    },

    searchClosedDeployTicket: {
        options: {
            type: 'search',
            query:
                'issuetype = "Code Deployment Request" AND ' +
                'summary ~ "\\"<%= currentFile.ticketTitle %>\\"" AND ' +
                'status IN ' + stagedOrClosedStatuses + ' ' +
                'ORDER BY updated DESC',
            config: 'jira.deployTickets.closedSearch'
        }
    },

    createDeployTicket: {
        options: {
            tasks: [{
                type: 'createissue',
                issue: {
                    fields: {
                        summary: '<%= currentFile.ticketTitle %>',
                        project: {
                            id: '<%= jiraValues.projectId %>' // FED Mobile
                        },
                        issuetype: {
                            id: '<%= jiraValues.deployIssueTypeId %>' // Code Deployment Request
                        },
                        labels: '<%= jiraValues.deployLabels %>',
                        environment: '<%= jiraValues.deployEnvironment %>',
                        'customfield_10216': '<%= jiraValues.deployUrlBase %><%= currentFile.fullPath %>', // Deploy URL
                        'customfield_10215': '<%= currentFile.currentMd5 %>', // Approved MD5
                        'customfield_10254': { // Financial Risk
                            'value': 'No',
                            'id': '10337'
                        },
                        'customfield_10112': 'Low', // Risk
                        'customfield_10111': 'Low', // Business Impact
                        'customfield_10360': deployTime, // Deploy Date/Time
                        'customfield_10300': { // Load Test
                            value: 'No Load Test Required (less than 42 users)'
                        },
                        'customfield_10262': 'NA', // Production Version
                        'customfield_10038': 'Change element to reference previous file version', // Roll-Back Plan
                        'customfield_10214': '1.) Is this a new Application / Table, please describe?  \r\n-- No, New version of Mobile Website file\r\n\r\n' +
                            '2.) Is the App or Table listed as Financially Impacting in the Application Catalog / EDW DB Catalog / ERP DB Catalog or Financial Systems Diagram, please describe? \r\n-- No known database impacts \r\n\r\n' +
                            '3.) Will this impact a report that has been determined to be a key Financial Report, please describe? \r\n-- No known impacts\r\n\r\n' +
                            '4.) Does this change/alter interfaces or ERP/GL, please describe? \r\n-- No, this does not alter any ERP/ GL interfaces to the best of my knowledge.\r\n\r\n' +
                            '5.) Does this create, change, or alter anything associated with; Cost Calculations, Inventory, Sales Tax, Credits/Debits, Payments, Cancellations, Returns, Coupons/Discounts, Return Shipping Costs/Fees, Patches, SOFS/Gateway, Payroll, Orders, GL Mapping, Partner Billing, Fixed Assets, Club-O Rewards, Currency Conversion, Ship Confirmations, SOFS, please describe? \r\n-- These changes do not affect any of those items to the best of my knowledge. Display Only.\r\n\r\n' +
                            '6.) Does this impact commission payment to Affiliates, CSE’s, CO-OP Revenue, etc., please describe? \r\n-- No, this does not affect  commission payments to the best of my knowledge. Display Only.',
                        description: 'Please deploy to /www/<%= currentFile.filetype %>/<%= currentFile.filename %>' +
                            '\r\n\r\nNew file, no purge needed'
                    }
                },
                config: 'currentFile.ticket'
            }, '<%= jira.updateDeployTicket.options %>'] // Update ticket after creation
        }
    },

    updateDeployTicket: {
        options: {
            type: 'updateissue',
            number: function(ticket, grunt) {
                var key;
                if (ticket) {
                    key = ticket.key;
                } else {
                    key = grunt.config.get('currentFile.ticket.key');
                }

                return key.replace('FED-', '');
            },
            update: {
                fields: {
                    'customfield_10254': { // Financial Risk
                        'value': 'No',
                        'id': '10337'
                    },
                    'customfield_10360': deployTime, // Deploy Date/Time
                    'customfield_10215': '<%= currentFile.currentMd5 %>', // Approved MD5
                    assignee: {
                        name: '<%= currentFile.assignee %>'
                    }
                }
            }
        }
    },

    options: {
        protocol: 'https',
        host: 'jira.overstock.com',
        port: '443',
        user: '<%= prompt.jira.username %>',
        password: '<%= prompt.jira.password %>',
        'project_key': 'FED'
    }
};
