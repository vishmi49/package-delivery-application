## Selected Use Case: Reschedule Deliveries

### Actor: Customer

### Description:
This use case allows customers to check the status and reschedule the delivery of their packages if needed, offering flexibility and control over their deliveries. The updated dates reflect in the system.

### Preconditions:
- The shipment is in progress.
- The user is logged in to the system.

### Postconditions:
- The delivery details are updated and displayed in the system.

### Priority: High
### Frequency of Use: 1-2 times

### Normal Course of Events:
1. The user logs into the system and navigates to the “Packages"/"Home" page.
2. The app displays the current delivery details along with the option to reschedule.
3. The user selects the “Reschedule Delivery” button.
4. The app displays a date picker for selecting a new delivery date.
5. The user adds the new date and optionally provides additional instructions.
6. The user saves the details by clicking the update button.
7. The system updates the delivery schedule.

### Exceptions:
1. **EX1**: Network Connectivity issues.
   - If the application loses connectivity during rescheduling, it displays a proper message p
2. **EX2**: System error.
   - If the system fails to update the data, it displays the error.

   ### Assumptions:
- Users have proper internet access while using the app.



