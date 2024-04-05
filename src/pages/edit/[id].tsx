import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { FormControl, MenuItem, Select, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { api } from "../../config/api";
import { Enterprise } from "../../types/Enterprise";
import Header from "../../components/Header";
import { ButtonRegister, ContentRegister, TitleRegister } from "./styles";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

  const STATUS = {
    RELEASE: 'Lançamento',
    SOON: 'Em breve',
    IN_WORKS: 'Em obras',
    READY_TO_LIVE: 'Pronto para morar'
  };

  const PURPOSE = {
    HOME: 'Residencial',
    COMMERCIAL: 'Comercial'
  };

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

 const [enterpriseData, setEnterpriseData] = useState<Enterprise | null>(null);
  const [cepData, setCepData] = useState<CepData | null>(null);
  const [formData, setFormData] = useState({
    status: '',
    name: '',
    purpose: '',
    address: {
      cep: '',
      number: '',
      district: '',
      city: '',
      street: '',
      state: '',
    },
  });

 useEffect(() => {
    if (id) {
      fetchEnterpriseData();
    }
  }, [id]);

   const fetchEnterpriseData = async () => {
    try {
      const response = await api.get(`/empreendimentos/${id}`);
      setEnterpriseData(response.data);
      setFormData({
        status: response.data.status || '',
        name: response.data.name || '',
        purpose: response.data.purpose || '',
        address: {
          cep: response.data.address.cep || '',
          number: response.data.address.number || '',
          district: response.data.address.district || '',
          city: response.data.address.city || '',
          street: response.data.address.street || '',
          state: response.data.address.state || '',
        },
      });
    } catch (error) {
      console.error("Erro ao carregar dados do empreendimento:", error);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSearch = useCallback(async () => {
    if (/^\d{8}$/.test(formData.address.cep)) {
      try {
        const response = await axios.get<any>(`https://viacep.com.br/ws/${formData.address.cep}/json/`);
        setCepData(response.data);
        setFormData(prevState => ({
          ...prevState,
          address: {
            ...prevState.address,
            district: response.data.bairro,
            city: response.data.localidade,
            street: response.data.logradouro,
            state: response.data.uf,
          },
        }));
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  }, [formData.address.cep]);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.patch(`/empreendimentos/${id}`, formData);
      alert("Sucesso!");
      router.push('/');
    } catch (error) {
      console.error('Erro ao editar empreendimento:', error);
    }
  }, [formData, id, router]);


  return (
    <>
      <Header
        title="Editar Empreendimento"
        IconReturn={true}
        PushButtonReturn={() => router.push("/")}
      />
      <div style={{ marginTop: '40px' }}>
        <ContentRegister>
          <TitleRegister>
            <h1 style={{ fontWeight: 700, fontSize: '18px' }}>Informações</h1>
          </TitleRegister>

          <form onSubmit={handleSubmit}>
            <FormControl variant="standard" sx={{ width: '100%', borderColor: "#BBB8D9",  marginTop: 5 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard-type"
                onChange={handleChange}
                name="status"
                label="Status"
                value={formData.status}
              >
                <MenuItem value="">Selecione o tipo</MenuItem>
                {Object.entries(STATUS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

               <TextField
              id="standard-basic"
              label="Nome do Empreendimento"
              variant="standard"
              sx={{ width: '100%', marginTop: 4 }}
              onChange={handleChange}
              name="name"
              value={formData.name}
            />

            <FormControl variant="standard" sx={{ width: '100%', marginTop: 5 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard-purpose"
                onChange={handleChange}
                name="purpose"
                label="Purpose"
                value={formData.purpose}
              >
                <MenuItem value="">Selecione o propósito</MenuItem>
                {Object.entries(PURPOSE).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="standard-basic"
              label="CEP"
              variant="standard"
              sx={{ width: '100%',  marginTop: 5  }}
              value={formData.address.cep}
              onChange={handleAddressChange}
              name="cep"
            />

            <Button 
              onClick={handleSearch} 
              sx={{ 
                padding: '10px 20px', 
                backgroundColor: "#3b3391", 
                color: "white", 
                marginTop: '10px', 
                borderRadius: '30px', 
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#5246b6',
                }
              }} 
            >
              Buscar CEP
            </Button>

            {cepData && (
              <div style={{ color: '#302E45', fontSize: '14px' }}>
                <p>CEP: {cepData.cep}</p>
                <p>Logradouro: {cepData.logradouro}</p>
                <p>Bairro: {cepData.bairro}</p>
                <p>Cidade: {cepData.localidade}</p>
                <p>Estado: {cepData.uf}</p>
              </div>
            )}

            <TextField
              id="standard-basic"
              label="Número"
              variant="standard"
              sx={{ width: '100%',  marginTop: 5  }}
              value={formData.address.number}
              onChange={handleAddressChange}
              name="number"
            />

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <ButtonRegister type="submit">Salvar Alterações</ButtonRegister>
            </div>
          </form>
        </ContentRegister>
      </div>
    </>
  );
};

export default Edit;
