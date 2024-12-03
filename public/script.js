const form = document.getElementById('customerForm');
const customersDiv = document.getElementById('customers');

const fetchCustomers = async () => {
    const response = await fetch('/api/customers');
    const customers = await response.json();
    customersDiv.innerHTML = customers.map(customer => `
        <div class="customer">
            <span>${customer.name} (${customer.email})</span>
            <button onclick="deleteCustomer('${customer.id}')">Delete</button>
        </div>
    `).join('');
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const customer = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        direccion_envio: document.getElementById('direccion_envio').value,
        direccion_facturacion: document.getElementById('direccion_facturacion').value,
        telefono: document.getElementById('telefono').value
    };

    await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });

    form.reset();
    fetchCustomers();
});

const deleteCustomer = async (id) => {
    await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    fetchCustomers();
};

fetchCustomers();
