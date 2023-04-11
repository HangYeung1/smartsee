import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useCompanies() {
  // State
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState<string[]>([]);

  // Fetch companies
  useEffect(() => {
    const companiesCollection = collection(db, "companies");
    const getCompanies = async () => {
      try {
        // Fetch companies from firestore
        const data = await getDocs(companiesCollection);
        const cleanedData: any = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompanies(cleanedData);
        console.log("Data fetched successfully!");

        // Calculate industries
        let tempIndustries = [];
        for (let company of cleanedData) {
          if (!tempIndustries.includes(company.industry)) {
            tempIndustries.push(company.industry);
          }
        }
        setIndustries(tempIndustries);
        console.log("Industries calculated successfully!");
      } catch (err) {
        console.error(err);
      }
    };
    getCompanies();
  }, []);
  return [companies, industries];
}
