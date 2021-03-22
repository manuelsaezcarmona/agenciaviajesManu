import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimoniales.js';

const paginaInicio = async (req, res) =>{ 
   
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));

    try {
         // Consultar 3 viajes del modelo Viaje
        const resultados = await Promise.all(promiseDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultados[0],
            testimoniales: resultados[1]
    });        
    } catch (error) {
        console.log(error);   
    };
}


const paginaNosotros = (req, res) => 
    res.render('nosotros',{
        pagina: 'Nosotros'
    });

const paginaTestimoniales = async(req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });    
    } catch (error) {
        console.log(error);
    }

} // paginaTestimoniales
    


const paginaViajes = async (req, res) => {
    // Consultar BBDD
    const viajes = await Viaje.findAll();
    //console.log(viajes);

    res.render('viajes',{
        pagina: 'Próximos Viajes',
        viajes: viajes    
    });
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) =>{
   const {slug} = req.params;
    try {
        const viaje = await Viaje.findOne({ where: {slug: slug} })
        res.render('viaje', {
            pagina: 'Informacion viaje', viaje
        }
        )
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaDetalleViaje
}