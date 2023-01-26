import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { addIdProductListAction } from '../../store/api-actions';
import './modal.css';

export default function ModalComponent(): JSX.Element {
  const { selectedProductList } = useAppSelector((state) => state);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const showModal = () => {
      setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    store.dispatch(addIdProductListAction(selectedProductList));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Button
      className='modal__button'
      onClick={showModal}>
      Аннулировать
    </Button>
    {selectedProductList.length > 0 ? 
      <Modal title='Вы уверены что хотите аннулировать товар(ы):'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Применить'
        cancelText='Отклонить'
      >
        <p>{selectedProductList.map((product) => product.name).join(', ')}</p>
      </Modal> :
      <Modal title='Выберите продукт'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
      </Modal>
    }
    </>
  );
};
