interface NavItemAdmin {
    path: string;
    title: string;
    icon?: string;
  }
  
  const linksAdmin: NavItemAdmin[] = [
    {
      path: 'estudiantes',
      title: 'Estudiantes',
      icon: 'person'
    },
    {
      path: 'cursos',
      title: 'Cursos',
      icon: 'school'
    },
    {
      path: 'inscripciones',
      title: 'Inscripciones',
      icon: 'done'
  
    },
    {
      path: 'usuarios',
      title: 'Usuarios',
      icon: 'person'
    }
  ]
  
  export default linksAdmin;
  