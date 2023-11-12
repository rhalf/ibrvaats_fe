import { firestore } from "@/plugins/firebase";
import { Timestamp } from "firebase/firestore";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAt,
  startAfter,
  endAt,
  endBefore,
  limitToLast,
  getCountFromServer,
} from "firebase/firestore";

import { toObject, toArray, getIndexes } from "../index";

const collectionName = "/users";
const collectionRef = collection(firestore, collectionName);

let indexes;

export const search = async (params, policeStation) => {
  const { searchText, columnName, orderDirection, limitNumber } = params;

  const users = await all(policeStation);
  const userList = users.map((user) => user.id);
  if (!userList.length) return [];

  const q = await query(
    collectionRef,
    where("id", "in", userList),
    orderBy(columnName, orderDirection),
    startAt(searchText),
    endAt(searchText + "\uf8ff"),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const more = async (params, policeStation) => {
  const { columnName, orderDirection, limitNumber } = params;

  const users = await all(policeStation);
  const userList = users.map((user) => user.id);
  if (!userList.length) return [];

  const q = await query(
    collectionRef,
    where("id", "in", userList),
    orderBy(columnName, orderDirection),
    startAfter(indexes.lastItem),
    limit(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (!snapshots.empty) indexes = getIndexes(snapshots);

  return toArray(snapshots);
};

export const prev = async ({
  firstItem,
  columnName,
  orderDirection,
  limitNumber,
}) => {
  const q = await query(
    collectionRef,
    orderBy(columnName, orderDirection),
    endBefore(indexes.firstItem),
    limitToLast(limitNumber)
  );
  const snapshots = await getDocs(q);
  if (snapshots.empty) throw new Error("First page!");

  indexes = getIndexes(snapshots);
  return toArray(snapshots);
};

export const all = async ({ id }) => {
  const cName = `policeStations/${id}/users`;
  const cRef = collection(firestore, cName);

  const q = await query(cRef);
  const snapshots = await getDocs(q);
  return toArray(snapshots);
};

export const get = async (id) => {
  const docRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
  else return null;
};

export const add = async (item, policeStation) => {
  const { id } = policeStation;

  const cName = `policeStations/${id}/users`;
  const docRef = doc(firestore, cName, item.id);
  return await setDoc(docRef, item);
};

export const remove = async (item, policeStation) => {
  const { id: userId } = item;
  const { id: policeStationId } = policeStation;

  const cName = `policeStations/${policeStationId}/users`;
  const docRef = doc(firestore, cName, userId);

  return await deleteDoc(docRef, item);
};

export const count = async (policeStation) => {
  const { id: policeStationId } = policeStation;

  const cName = `policeStations/${policeStationId}/users`;
  const cRef = collection(firestore, cName);

  const q = query(cRef);
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};
