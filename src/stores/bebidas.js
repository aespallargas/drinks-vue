import { ref, reactive, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import APIServices from "../services/APIServices";
import {useModalStore} from './modal'


export const useBebidasStore = defineStore('bebidas', () => {

    const modal = useModalStore()
    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })
    const recetas = ref([])
    const receta = ref({})

    onMounted(async () => {
        const {data: {drinks}} = await APIServices.obtenerCategorias()

        categorias.value = drinks
    })


    async function obtenerRecetas() {
       const {data: {drinks}} = await APIServices.buscarRecetas(busqueda)
       console.log(drinks)
       recetas.value = drinks
    }

    async function seleccionarBebida(id) {
        const {data: {drinks}} = await APIServices.buscarReceta(id)
        
        receta.value = drinks[0]

        modal.handleClickModal()
    }

    const noRecetas = computed(()=> recetas.value.length === 0)

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
        receta,
        noRecetas
    }

})