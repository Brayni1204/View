document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    const username = 'brayni1204';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los proyectos');
            }
            return response.json();
        })
        .then(data => {
            // Filtrar repositorios (opcional: quitar forks si se desea)
            const projects = data.filter(repo => !repo.fork); // Mostrar solo proyectos propios si se desea, o todos.
            
            projectsContainer.innerHTML = ''; // Limpiar mensaje de carga

            if (projects.length === 0) {
                projectsContainer.innerHTML = '<p>No se encontraron proyectos públicos.</p>';
                return;
            }

            projects.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card';
                
                // Formatear fecha
                const date = new Date(repo.updated_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Sin descripción disponible.'}</p>
                    <div class="project-stats">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span>${repo.language || 'Varios'}</span>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="btn-github">
                            <i class="fab fa-github"></i> Ver en GitHub
                        </a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn-demo" style="margin-left: 10px; color: var(--primary-color); text-decoration: none;">Ver Demo <i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                    <div style="margin-top: 10px; font-size: 0.8rem; color: #888;">Actualizado: ${date}</div>
                `;
                
                projectsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            projectsContainer.innerHTML = `<p>Hubo un error al cargar los proyectos: ${error.message}</p>`;
        });
});
