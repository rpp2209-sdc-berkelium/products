import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 4000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 3500,
      maxVUs: 4500
    }
  }
}

export default function () {
  http.get('http://localhost:8080/products/999988/related');
}