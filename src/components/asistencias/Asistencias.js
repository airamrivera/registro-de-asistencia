import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../features/authSlice'; // Importa la acción para obtener datos del usuario
import axios from 'axios';


const Asistencias = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [clases, setClases] = useState([]);
    const [signature, setSignature] = useState([]);
    const [hours, setHours] = useState([]);
    const [observations, setObservations] = useState([]);
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getMe());
        getClasses(); 
    }, [dispatch]);

    useEffect(() => {
        dispatch(getMe());
        getSignature(); 
    }, [dispatch]);


     useEffect(() => {
        dispatch(getMe());
        getHours(); 
    }, [dispatch]);
  

     useEffect(() => {
        dispatch(getMe());
        getObservations(); 
    }, [dispatch]);
  
    const getClasses = async () => {
            const response = await axios.get('http://localhost:5000/classes');
            setClases(response.data)
    };
    
     const getSignature = async () => {
        const response = await axios.get('http://localhost:5000/signatures');
        setSignature(response.data)
    };
   
       const getHours = async () => {
        const response = await axios.get('http://localhost:5000/hours');
        setHours(response.data)
    };
    
      const getObservations = async () => {
        const response = await axios.get('http://localhost:5000/observations');
        setObservations(response.data)
    };
    

return (
    <div>
    <div className="card">
        <div className="card__wrapper">
            <div className="card___wrapper-acounts">
                <div className="card__score">+3</div> 
            </div>
            <div className="card__menu"><svg xmlns="http://www.w3.org/2000/svg" width="4" viewBox="0 0 4 20" height="20" fill="none"><g fill="#000"><path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z"></path><path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z"></path><path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z"></path></g></svg></div>
        </div>
        <div className="card__title">Lista de asistencia de docentes</div>
        <div className="card__subtitle">Nombre: {user ? user.name : 'Cargando...'}</div>
        <div className="card__subtitle">Correo: {user ? user.email : 'Cargando...'}</div>
        <div className="card__subtitle">Rol: {user ? user.role : 'Cargando...'}</div>
      
        {clases.map((clase, index) => (
                    <div key={clase.uuid} className="card__subtitle">
                        Clases {index + 1}: {clase.className} - Profesor: {clase.user.name}
                    </div>
                ))}

         {signature.map((signature, index) => (
                    <div key={signature.uuid} className="card__subtitle">
                        Clases {index + 1}: {signature.signatureName} 
                    </div>
                ))}

          {hours.map((hours, index) => (
                    <div key={hours.uuid} className="card__subtitle">
                     hora de entrada de clase {index + 1}: {hours.startTime} - Hora de salida: {hours.endTime} 
                    </div>
                ))}

        {/* fin de  Mostrar las signatures */}

        {/*inicio de Mostrar las signatures */}
        {observations.map((observations, index) => (
                    <div key={observations.uuid} className="card__subtitle">
                        Observacion realizada {index + 1}: {observations.content}
                    </div>
                ))}
            
        <div className="card_indicator"><span className="cardindicator-amount">135</span> Works / <span className="card_indicator-percentage">45%</span></div>
        <div className="card__progress"><progress max="100" value="40"></progress></div>
    </div>
</div>
    )
}

export default Asistencias