const projects = gsap.utils.toArray('.project')
const thumbnails = gsap.utils.toArray('.thumbnail')
const projectThumbnail = document.querySelector('.project-thumbnail')
const projectsContainer = document.querySelector('.projects')

// Initial setup
gsap.set(projectThumbnail, { scale: 0, xPercent: -50, yPercent: -50, rotation: 0 })

// QuickTo functions for performance
const xTo = gsap.quickTo(projectThumbnail, 'x', { duration: 0.4, ease: 'power3.out' })
const yTo = gsap.quickTo(projectThumbnail, 'y', { duration: 0.4, ease: 'power3.out' })
const rotTo = gsap.quickTo(projectThumbnail, 'rotation', { duration: 0.6, ease: 'power3.out' })

// Entrance Animations
gsap.from('.header', { y: -50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
gsap.from('.footer', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
gsap.from(projects, { 
    y: 100, 
    opacity: 0, 
    duration: 1, 
    stagger: 0.1, 
    ease: 'power4.out',
    delay: 0.4 
})

// Mouse Move Tracking
let lastX = 0;
projectsContainer.addEventListener('mousemove', e => {
	xTo(e.clientX)
	yTo(e.clientY)
    
    // Calculate rotation based on mouse speed/direction
    const deltaX = e.clientX - lastX;
    lastX = e.clientX;
    const rotation = Math.max(Math.min(deltaX * 0.2, 15), -15);
    rotTo(rotation);
})

projectsContainer.addEventListener('mouseleave', () => {
	gsap.to(projectThumbnail, {
		scale: 0,
        rotation: 0,
		duration: 0.5,
		ease: 'power3.out',
		overwrite: 'auto',
	})
})

projects.forEach((project, index) => {
    const title = project.querySelector('h2')
    const category = project.querySelector('p')

    // Hover Animation on list items
	project.addEventListener('mouseenter', () => {
		gsap.to(projectThumbnail, {
			scale: 1,
			duration: 0.5,
			ease: 'back.out(1.2)',
			overwrite: 'auto',
		})

		gsap.to(thumbnails, {
			yPercent: -100 * index,
			duration: 0.5,
			ease: 'power3.out',
			overwrite: 'auto',
		})
        
        // Text animation
        gsap.to(title, { x: 20, color: '#fff', scale: 1.05, duration: 0.4, ease: 'power2.out' })
        gsap.to(category, { x: -20, opacity: 0.5, duration: 0.4, ease: 'power2.out' })
	})

    project.addEventListener('mouseleave', () => {
        // Revert Text animation
        gsap.to(title, { x: 0, color: '#fff', scale: 1, duration: 0.4, ease: 'power2.out' })
        gsap.to(category, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
    })
})
