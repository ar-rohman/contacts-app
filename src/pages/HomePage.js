import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { getContacts, deleteContact } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';

export default function HomePage() {
    const [searchParams, setSearchParam] = useSearchParams();
    const [contacts, setContacts] = useState([]);
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get('keyword') || '';
    });

    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        getContacts().then(({ data }) => {
            setContacts(data);
        });
    }, []);

    const changeSearchParams = (keyword) => {
        setSearchParam({ keyword });
        setKeyword(keyword);
    }

    const onDeleteHandler = async (id) => {
        await deleteContact(id);
        const { data } = await getContacts();
        setContacts(data)
    }

    const filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(keyword.toLowerCase());
    });

    return (
        <section>
            <SearchBar keyword={keyword} keywordChange={changeSearchParams}  />
            <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contacts List'}</h2>
            <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
        </section>
    )
}

// function HomePageWrapper() {
//     const [searchParams, setSearchParam] = useSearchParams();
//     const keyword = searchParams.get("keyword");

//     function changeSearchParams(keyword) {
//         setSearchParam({ keyword });
//     }

//     return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
// }

// class HomePage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             contacts: [],
//             keyword: props.defaultKeyword || '',
//         }

//         this.onDeleteHandler = this.onDeleteHandler.bind(this);
//         this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//     }

//     async componentDidMount() {
//         const { data } = await getContacts();

//         this.setState({ contacts: data })
//     }

//     async onDeleteHandler(id) {
//         await deleteContact(id);

//         const { data } = await getContacts();

//         this.setState(() => {
//             return {
//                 contacts: data,
//             }
//         });
//     }

//     onKeywordChangeHandler(keyword) {
//         this.setState(() => {
//             return {
//                 keyword
//             }
//         })

//         this.props.keywordChange(keyword);
//     }

//     render() {
//         const contacts = this.state.contacts.filter((contact) => {
//             return contact.name.toLowerCase().includes(this.state.keyword.toLowerCase());
//         })
//         return (
//             <LocaleConsumer>
//                 {
//                     ({ locale }) => {
//                         return (
//                             <section>
//                                 <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler}  />
//                                 <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contacts List'}</h2>
//                                 <ContactList contacts={contacts} onDelete={this.onDeleteHandler} />
//                             </section>
//                         )
//                     }
//                 }
                
//             </LocaleConsumer>
//         )
//     }
// }

// export default HomePageWrapper;
