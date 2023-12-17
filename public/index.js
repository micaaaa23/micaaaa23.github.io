document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('.table tbody tr');

    rows.forEach(row => {
        const columns = row.getElementsByTagName('td');
        if (columns[6].textContent.toLowerCase().trim() === 'completed') {
            let removeButtons = row.querySelectorAll(".btn-warning, .btn-danger");
            removeButtons.forEach(button => {
                button.classList.add('d-none');
            });
        }

        console.log(`Equipment: ${columns[0].textContent}`);
        console.log(`Brand: ${columns[1].textContent}`);
        console.log(`Status: ${columns[6].textContent}`);
    });

    // View Button
    const viewButtons = document.querySelectorAll('.view-ticket');
    const deleteButton = document.querySelectorAll('.delete-ticket');

    viewButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let row = this.closest('tr');
            let columns = row.getElementsByTagName('td');

            let receiptNo = row.querySelector('th').textContent;
            let status = columns[6].textContent.toLowerCase().trim();

            let equipment = document.getElementById('field-status');
            let brand = document.getElementById('request-title');
            let model = document.getElementById('ordered-by');
            let number = document.getElementById('location');
            let dateOrdered = document.getElementById('ordered-date');
            let shipmentDate = document.getElementById('shipment-date');
            let statusField = document.getElementById('quantity');

            equipment.value = columns[0].textContent;
            brand.value = columns[1].textContent;
            model.value = columns[2].textContent;
            number.value = columns[3].textContent;
            dateOrdered.value = columns[4].textContent;
            shipmentDate.value = columns[5].textContent;
            statusField.value = status;

            // Assuming you want to display the receipt number in the modal title
            let modalTitle = document.getElementById('modal-ticket-no');
            modalTitle.textContent = ` ${receiptNo}`;

            // Change modal header color based on status
            changeModalHeaderColor(status);
        });
    });
    // All Delete Buttons
    deleteButton.forEach(function (button) {
        button.addEventListener('click', function () {
            removeRowHighlight();
            let row = this.parentElement.parentElement;
            const ticketNo = row.querySelector('th');
            const modalDelete = document.querySelector("#deleteTicketModal");
            const myModal = new bootstrap.Modal(modalDelete);
            const modalText = modalDelete.querySelector("#delete-prompt");
            modalText.innerHTML = `Are you sure you want to delete <strong>${ticketNo.textContent}</strong>?`;
            myModal.show();

            const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
            confirmDelBtn.addEventListener("click", function () {
                myModal.hide();
                row.remove();
                generateToast("text-bg-danger", `Ticket <strong>${ticketNo.textContent}</strong> is DELETED`);

    function changeModalHeaderColor(status) {
        let modalHeader = document.getElementById('modal-ticket-no');
        modalHeader.classList.remove('bg-warning', 'bg-success', 'bg-success', 'bg-primary', 'bg-danger');

        let fstatus = document.getElementById('quantity');
        fstatus.classList.remove('text-bg-warning', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger');

        switch (status) {
            case 'Pending':
                modalHeader.classList.add('bg-primary');
                break;
            case 'overdue':
                modalHeader.classList.add('bg-warning');
                break;
            case 'On Queue':
                modalHeader.classList.add('bg-secondary');
                fstatus.classList.add('text-bg-secondary');
                break;
            case 'Received':
                modalHeader.classList.add('bg-success');
                fstatus.classList.add('text-bg-success');
                break;
            default:
                modalHeader.classList.add('bg-danger');
                fstatus.classList.add('text-bg-danger');
                break;
        }
    }


            });
         });
    });
 });

