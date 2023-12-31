import { Databases, Query, ID } from 'appwrite';
import client from './appwriteApp';

const awDatabase = new Databases(client);
const awDatabaseData = {
  dbId: '64b635d19298bd08da79',
  currencyCol: '64ac3adab8e2a0a907ba',
  mealCol: '64b6499e70adbc0a4dbb',
  sectionCol: '64b635db48373fc4878d',
};

// Obtiene todas las secciones del menú
async function getSections() {
  const responseData = await awDatabase.listDocuments(
    awDatabaseData.dbId,
    awDatabaseData.sectionCol,
    [Query.orderDesc('$createdAt')],
  );
  return responseData.documents.map((doc) => ({ id: doc.$id, name: doc.name }));
}

// Borra una sección del menú (y todos sus elementos)
async function deleteSection(sectionId) {
  try {
    await awDatabase.deleteDocument(awDatabaseData.dbId, awDatabaseData.sectionCol, sectionId);
    return true;
  } catch {
    return false;
  }
}

// Agrega una sección al menú
async function addSection(name) {
  try {
    const responseData = await awDatabase.createDocument(
      awDatabaseData.dbId,
      awDatabaseData.sectionCol,
      ID.unique(),
      { name },
    );
    return responseData.$collectionId;
  } catch {
    return null;
  }
}

// Obtiene todos los elementos de una sección
async function getFoodBySection(sectionId) {
  try {
    const responseData = await awDatabase.listDocuments(
      awDatabaseData.dbId,
      awDatabaseData.mealCol,
      [Query.equal('section', [sectionId])],
    );
    return responseData.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      price: doc.price,
    }));
  } catch {
    return null;
  }
}

// Agrega un elemento a una sección
async function addFoodBySection(sectionId, name, price) {
  try {
    const responseData = await awDatabase.createDocument(
      awDatabaseData.dbId,
      awDatabaseData.mealCol,
      ID.unique(),
      { name, price, sections: sectionId },
    );
    return responseData.$id;
  } catch {
    return null;
  }
}

// Edita una elemento de una sección
async function editFoodById(sectionId, itemId, name, price) {
  try {
    const responseData = await awDatabase.updateDocument(
      awDatabaseData.dbId,
      awDatabaseData.mealCol,
      itemId,
      { name, price, sections: sectionId },
    );
    return responseData.$id;
  } catch {
    return null;
  }
}

// Elimina una elemento de una sección
async function deleteFoodById(itemId) {
  try {
    await awDatabase.deleteDocument(awDatabaseData.dbId, awDatabaseData.mealCol, itemId);
    return true;
  } catch {
    return false;
  }
}

// Obtiene todos los elementos de la lista de cambio de moneda
async function getAllCurrencyExchange() {
  const responseData = await awDatabase.listDocuments(
    awDatabaseData.dbId,
    awDatabaseData.currencyCol,
    [Query.orderDesc('$updatedAt')],
  );
  return responseData.documents.map((doc) => ({
    id: doc.$id,
    name: doc.name,
    value: doc.value,
  }));
}

// Agrega un elemento a los cambios de moneda
async function addCurrencyExchange(name, value) {
  try {
    const responseData = await awDatabase.createDocument(
      awDatabaseData.dbId,
      awDatabaseData.currencyCol,
      ID.unique(),
      { name, value },
    );
    return responseData.$id;
  } catch {
    return null;
  }
}

// Edita un elemento en los cambios de moneda
async function editCurrencyExchange(currencyId, value) {
  try {
    const responseData = await awDatabase.updateDocument(
      awDatabaseData.dbId,
      awDatabaseData.currencyCol,
      currencyId,
      { value },
    );
    return responseData.$id;
  } catch {
    return null;
  }
}

// Elimina un elemento en los cambios de moneda
async function deleteCurrencyExchange(currencyId) {
  try {
    await awDatabase.deleteDocument(awDatabaseData.dbId, awDatabaseData.currencyCol, currencyId);
    return true;
  } catch {
    return false;
  }
}

export default {
  getSections,
  deleteSection,
  addSection,
  getFoodBySection,
  addFoodBySection,
  editFoodById,
  deleteFoodById,
  getAllCurrencyExchange,
  addCurrencyExchange,
  editCurrencyExchange,
  deleteCurrencyExchange,
};
