import Header from '@/components/atoms/titleHeader/Header';
import WebsitePolicy from '@/components/pages/common/WebPolicy/WebPolicy';

const WebUsePolicyPage = () => {
    return (
        <div className='w-full overflow-x-hidden'>
            <Header
                title='Ed-Cred Website Use Policy'
                description='Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all.'
                />
            <WebsitePolicy/>
        </div>
    )
}

export default WebUsePolicyPage;
