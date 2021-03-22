import {Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    // Validar formulario
    const {nombre, email, mensaje} = req.body;
    const errores = [];

    if (nombre.trim() ===''){
        errores.push({mensaje: 'El nombre está vacio'});
    }
    if (email.trim() ===''){
        errores.push({mensaje: 'El email está vacio'});
    }
    if (mensaje.trim() ===''){
        errores.push({mensaje: 'El mensaje está vacio'});
    }

    if(errores.length > 0){
        // Consultar los anteriores testimonios
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        res.render('testimoniales',
        {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje, 
            testimoniales
        })
    }else{
        // Almacenar Testimonial en la base de Datos.
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    } 
    
    //console.log(errores);
}

export {
    guardarTestimonial
};