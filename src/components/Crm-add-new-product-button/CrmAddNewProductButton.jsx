import * as yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import { setFormErrors } from '../../Redax/Crm-add-new-product/slices/product-slice'
import {
  addPrice,
  createNewProduct
} from '../../Redax/Crm-add-new-product/operation/Operation'
import {
  selectFormData,
  selectProductId
} from '../../Redax/Crm-add-new-product/selectors/Selectors'
import {
  newProductSchema,
  newProductImagesSchema,
  newProductPriceSchema
} from '../../Halpers/validateNewProduct'
import styles from './crmAddNewProductButton.module.scss'
import { useEffect } from 'react'

const CrmAddNewProductButton = () => {
  const productData = useSelector(selectFormData)
  const productId = useSelector(selectProductId)
  const dispatch = useDispatch()

  useEffect(() => {
    const sendPricesSequentially = async () => {
      if (productId) {
        productData.price.forEach((price) => {
          dispatch(addPrice({ price, productId }))
            .unwrap()
            .catch((error) => {
              return console.log(error)
            })
        })
      }
    }
    sendPricesSequentially()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productId])

  const handleClickSaveProduct = async (e) => {
    e.preventDefault()
    try {
      await newProductSchema.validate(productData, { abortEarly: false })
      await newProductImagesSchema.validate(
        { images: productData.images },
        { abortEarly: false }
      )
      await newProductPriceSchema.validate(productData.price, {
        abortEarly: false
      })

      dispatch(setFormErrors({}))
      await dispatch(createNewProduct(productData)).unwrap()
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {}
        error.inner.forEach((err) => {
          return !newErrors[err.path] && (newErrors[err.path] = err.message)
        })
        dispatch(setFormErrors(newErrors))
      }
    }
  }

  return (
    <div className={styles.saveBtnWrapp}>
      <button
        className={styles.saveBtns}
        onClick={handleClickSaveProduct}
        disabled={productData.isLoading}
      >
        {productData.isLoading > 0 && (
          <span>
            <ClipLoader size={15} color={'#FFFFFF'} />
          </span>
        )}
        Зберегти
      </button>
      {productData.isLoading > 0 && (
        <p className={styles.isLoadingText}>
          Збереження! Не закривайте сторінку.
        </p>
      )}
    </div>
  )
}

export default CrmAddNewProductButton
