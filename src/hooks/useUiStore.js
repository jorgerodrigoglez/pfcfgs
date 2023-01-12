import { useSelector, useDispatch } from "react-redux";
import { onOpenModal, onCloseModal } from "../store";

export const useUiStore = () => {

  const dispatch = useDispatch();
  const { isOpenModal } = useSelector(state => state.ui);

  const openModal = () => {
    dispatch(onOpenModal());
  };

  const closeModal = () => {
    dispatch(onCloseModal());
  };

  return {
    // propiedades
    isOpenModal,

    // metodos
    openModal,
    closeModal
  };
};
