class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    console.log(`El nombre completo es: ${this.nombre} ${this.apellido}`);
  }

  addMascotas(nuevaMascota) {
    mascotas.push(nuevaMascota);
  }

  addBook(nombreLibro, nombreAutor) {
    const nuevoLibro = { nombre: nombreLibro, autor: nombreAutor };
    this.libros.push(nuevoLibro);
  }

  countMascotas() {
    console.log(mascotas.length);
  }

  getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }
}
const mascotas = ["Perro", "Gato", "Hipopotamo"];
const libro1 = { nombre: "Hobbit", autor: "J.R.R Tolkien" };
const libro2 = { nombre: "Rayuela", autor: "Cortazar" };
const arrayLibros = [libro1, libro2];

const usuario = new Usuario("ivan", "rapisarda", arrayLibros, mascotas);

usuario.getFullName();
usuario.addBook("Señor de los anillos", "J.R.R Tolkien");
usuario.addMascotas("Sapo");
usuario.countMascotas();

console.log(usuario.libros);
console.log(usuario.mascotas);
console.log(usuario.getBookNames());
