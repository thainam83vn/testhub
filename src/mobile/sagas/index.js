import { put, call, takeEvery } from "redux-saga/effects";
import Api from "./../api";
import axios from "axios";

// FETCH_USERS
function* fetchExams(action) {
  console.log("fecth all exams");
  const result = yield Api.get("exams", action.payload);
  yield put({ type: "UPDATE_STATE", payload: { data: { exams: result } } });
}

function* fetchTakeExam(action) {
  console.log("fecth take exam");
  const { exam } = action.payload;
  const result = yield Api.get("questions", {
    filter: `{exam_id=${exam._id}}`
  });
  yield put({
    type: "UPDATE_STATE",
    payload: { data: { take_exam: { questions: result, current: 0 } } }
  });
}

// use them in parallel
export default function* rootSaga() {
  yield takeEvery("FETCH_EXAMS", fetchExams);
  yield takeEvery("FETCH_TAKE_EXAM", fetchTakeExam);
}
