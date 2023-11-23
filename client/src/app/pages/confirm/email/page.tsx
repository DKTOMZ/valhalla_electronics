'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import ErrorPage from "@/components/error";
import { FormSubmitButton } from "@/components/form_submit_button";
import {FrontendServices} from "@/lib/inversify.config";
import { HttpService } from "@/services/httpService";
import { HttpServiceResponse } from "@/models/httpServiceResponse";
import { GenericResponse } from "@/models/genericResponse";

const VerifyEmail = () => {

  //Incoming params
  const token = useSearchParams().get("token");
  if (!token) {
    return <ErrorPage title="Error: 404" error="Invalid Link." />;
  }

  //Services
  const router = useRouter();
  const http = FrontendServices.get<HttpService>('HttpService');
  
  //State variables
  const [loading, setLoading] = useState(true);
  const [verificationResponse, setverificationResponse] = useState<GenericResponse>();

  //Handle data fetching
  useEffect(() => {
    const fetchVerificationResponse = async () => {
      const response : HttpServiceResponse<GenericResponse> = await http.get(`${process.env.NEXT_PUBLIC_VALHALLA_URL}/api/confirm/email/token=${token}`);
      if (response.status >= 200 && response.status<=299 && response.data) {
        setverificationResponse(response.data);
        setLoading(false);
      }
    }
    fetchVerificationResponse();
  }, [token]);

  if (loading) {
    return <div>
      <title>Valhalla - Email confirmation</title>
      <Loading />
    </div>
  }

  if (verificationResponse && verificationResponse.success) {
    return <div className="h-screen flex flex-col items-center justify-center">
        <title>Valhalla - Email confirmed</title>
        <h2 className="dark:text-white mb-5">Congratulations! Your email has been verified. Click the button below to proceed to login.</h2>
        <FormSubmitButton text="Login" callback={() => { router.replace('/pages/auth/login'); } } disabled={false} />
    </div>
  }

  if (verificationResponse && verificationResponse.error) {
    return <ErrorPage title={`Error`} error={verificationResponse.error}/>
  }
  
};

export default VerifyEmail;
