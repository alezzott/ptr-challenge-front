import { useEffect, useState } from "react";
import Head from "next/head";
import ButtonFooter from "../components/buttonFooter/buttonFooter";
import Header from "../components/Header";
import { IconButton, Input, InputAdornment, Alert, Button } from "@material-ui/core";
import {
    BoxNameEnterprise,
    ContainerHome,
    ContentHome,
    ContentStatus,
    ContainerLupa,
    ContentLupa,
} from "./styles";
import { api } from "../config/api";
import { Enterprise } from "../types/Enterprise";
import { useRouter } from "next/router";
import Image from 'next/image';


export default function Home() {
    const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
    const [isHome, setIsHome] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [enterprisesNumber, setEnterprisesNumber] = useState(0)

    const [search, setSearch] = useState("")

    const [openModalDelete, setOpenModalDelete] = useState(false);

    async function handleGetEnterprises() {
        try {
            const response = await api.get('/empreendimentos/list');
            setEnterprises(response.data.enterprises);
        } catch (error) {
            console.error(error);
        }


    }

    useEffect(() => {
        function numberEnterprises() {
            setEnterprisesNumber(enterprises.length);
        }

        numberEnterprises();
    }, [enterprises]);


    useEffect(() => {
        handleGetEnterprises()
    }, [])


    const router = useRouter();


    function handleHereNewEnterprise() {
        router.push('/register');
    }

    function handleHome() {
        setIsHome(true);
    }


    async function DeleteEnterprise(id: string) {
        try {
            await api.delete(`/empreendimentos/${id}`)
            const updatedEnterprises = enterprises.filter(enterprise => enterprise.id !== id);
            setEnterprises(updatedEnterprises);
        } catch (error) {
            console.error(error)
        }
    }


    function handleSearch(enterprises: Enterprise[], search: string, rowsPerPage: number): any[] | string {
        const filteredEnterprises = enterprises
            .filter((data: any) => {
                return data.name.toLowerCase().includes(search.toLowerCase());
            })
            .slice(0, rowsPerPage);

        if (filteredEnterprises.length === 0) {
            return "Nenhum item encontrado.";
        }

        return filteredEnterprises;
    }

    const searchResults = handleSearch(enterprises, search, rowsPerPage);

    return (
        <>
            <Head>
                <title>ChallengeJob</title>
            </Head>

            <main>
                {isHome &&
                    <>
                        <Header
                            title="Empreendimentos"
                            button={true}
                            IconReturn={false}
                            PushButton={handleHereNewEnterprise}
                            PushButtonReturn={handleHome}
                        />
                        <ContainerLupa>
                            <ContentLupa>

                                <Input
                                    fullWidth
                                    id="standard-adornment-password"
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton type="submit" aria-label="search">
                                                <Image width={15}
                                                    height={15} src="/images/lupa.svg" alt="Icone Lupa" />
                                                Buscar
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                            </ContentLupa>
                        </ContainerLupa>


                        {typeof searchResults === 'string' ? (
                            <p>{searchResults}</p>
                        ) : (
                            searchResults.map((enterprise) => (
                                <div key={enterprise.id}>
                                    <ContainerHome>
                                        <ContentHome>
                                            {openModalDelete === enterprise.id ? (
                                                <Alert
                                                    severity="error"
                                                    action={
                                                        <>
                                                            <Button onClick={() => setOpenModalDelete(false)} color="inherit" size="small">
                                                                Cancelar
                                                            </Button>
                                                            <Button onClick={() => DeleteEnterprise(enterprise.id)} color="inherit" size="small">
                                                                Confirmar
                                                            </Button>
                                                        </>
                                                    }
                                                >
                                                    Confirma a exclusão do Empreendimento?
                                                </Alert>
                                            ) : (
                                                <div>
                                                    <BoxNameEnterprise>
                                                        <span>{enterprise.name}</span>
                                                    </BoxNameEnterprise>
                                                    <p>{enterprise.address.street}, {enterprise.address.number} - {enterprise.address.district}, {enterprise.address.state}</p>
                                                </div>
                                            )}

                                            <ContentStatus>
                                                <div>{enterprise.status === "RELEASE" ? "Lançamento" : enterprise.status}</div>
                                                <div>{enterprise.purpose === "HOME" ? "Residencial" : enterprise.purpose}</div>
                                            </ContentStatus>
                                            <div style={{ display: 'flex' }}>


                                                <a href={`/edit/${enterprise.id}`}>
                                                    <Image
                                                        src="/images/Vector.svg"
                                                        alt="Icone de Lapis"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </a>
                                                <a href={`/delete/${enterprise.id}`}>
                                                    <Image
                                                        src="/images/Vector-1.svg"
                                                        alt="Icone de Lixeira"
                                                        width={20}
                                                        height={20}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setOpenModalDelete(enterprise.id);
                                                        }}
                                                    />
                                                </a>
                                            </div>
                                        </ContentHome>
                                    </ContainerHome>
                                </div>
                            ))
                        )}




                        {(enterprisesNumber > 5) && <ButtonFooter description={"Carregar mais"} pushClick={() => setRowsPerPage(rowsPerPage + 5)} />}

                    </>
                }
            </main>
        </>
    )
}